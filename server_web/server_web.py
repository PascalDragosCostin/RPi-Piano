import socket
import zlib
import threading
import json
from pathlib import Path

isGzipCompression = True


def fileType(tip):
    switcher = {
        "html": "text/html",
            "css": "text/css",
            "js": "application/js",
            "png": "image/png",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "gif": "image/gif",
            "ico": "image/x-icon",
            "json": "application/json",
            "xml": "applicaton/xml"
        }
    return switcher.get(tip, "text/plain")


def gzipCompress(content):
    gzip_compress = zlib.compressobj(9, zlib.DEFLATED, zlib.MAX_WBITS | 16)
    data = gzip_compress.compress(content) + gzip_compress.flush()
    return data


def processRequests(connection, address):
    print(
        f"S-a conectat un client la adresa: {address[0]} si portul {address[1]}")
    # se proceseaza cererea si se citeste prima linie de text
    cerere = ""
    linieDeStart = ""

    while True:
        data = connection.recv(1024)
        cerere = cerere + data.decode()
        print("S-a citit mesajul: \n---------------------------\n" +
              cerere + "\n---------------------------")
        pozitie = cerere.find('\r\n')
        if pozitie > -1:
            linieDeStart = cerere[0:pozitie]
            print("S-a citit linia de start din cerere: ##### " +
                  linieDeStart + " ##### ")
            break
        else:
            return
    # TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
    # TODO trimiterea răspunsului HTTP
    print("#### Construiesc raspunsul")
    # linieDeStart = GET /index.html HTTP1.1
    resursaCeruta = linieDeStart.split(" ")  # array de stringuri
    # liniile sunt despartite de  crlf ="\r\n"
    crlf = "\r\n"

    if resursaCeruta[0] == "GET":
        resursaCeruta = resursaCeruta[1].split("?")[0]  # al doilea cuvant
        resursaCeruta = resursaCeruta[1:]   # cuvantul fara "/"
        if resursaCeruta == "":
            resursaCeruta = "/index.html"

        try:
            fisierCerut = open("WEB/" + resursaCeruta,
                               "rb")   # rb = read bytes
            mesaj: bytes = fisierCerut.read()
            if isGzipCompression:
                mesaj = gzipCompress(mesaj)

            status = "HTTP/1.1 200 OK" + crlf
            fisierCerut.close()
        except:
            mesaj: bytes = b"File not found"
            status = "HTTP/1.1 404 Not Found" + crlf

        print("Resursa ceruta: " + resursaCeruta)
        extension = resursaCeruta.split(".")[-1]  # cuvantul de dupa .
        # switch
        contentType = fileType(extension) + crlf

        if isGzipCompression:
            contentEncoding = "gzip" + crlf
        else:
            contentEncoding = ""
    else:
        # Post
        resursaCeruta = resursaCeruta[1]   # al doilea cuvant
        resursaCeruta = resursaCeruta[1:]   # cuvantul fara "/"
        if resursaCeruta == "api/utilizatori":
            status = "HTTP/1.1 200 OK" + crlf
            query = cerere.split("\r\n")[-1]
            print(query)
            user_info = query.split("&")

            path = Path()
            root = path.parent
            target_path = str(root) + "/continut/resurse/utilizatori.json"
            print(target_path)

            with open(target_path, "r") as f:
                data = f.read()
                users = json.loads(data)
            new_user = {par.split("=")[0]: par.split("=")[1] for par in user_info}
            users.append(new_user)
          
        
            with open(target_path, "wb") as f:
                f.write(json.dumps(users).encode("ascii"))
        else:
            status = "HTTP/1.1 404 Not Found" + crlf
        httpResponse = ""
        contentType = "text/plain"
        mesaj = b""
        contentEncoding = ""

    server = "server_web.python" + crlf
    contentLenght = str(len(mesaj)) + crlf
    response = status + "Content-Length:" + contentLenght + "Content-Type: " + contentType + "Server: " + server + "Content-Encoding: " + contentEncoding + crlf
    httpResponse = response.encode() + mesaj
    connection.sendall(httpResponse)
    print("#### Am trimis raspunsul")
    # print("Raspunsul:\n" + httpResponse.decode("utf-8"))

    connection.close()
    print("S-a terminat comunicarea cu clientul.")


if __name__ == "__main__":
    # creeaza un server socket
    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serversocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
    serversocket.bind(("", 5678))
    # serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
    serversocket.listen(5)

    while True:

        try:
            print("#########################################################################")
            print("Serverul asculta potentiali clienti.")
            # asteapta conectarea unui client la server
            # metoda `accept` este blocanta => connection, care reprezinta socket-ul corespunzator clientului conectat
            (connection, address) = serversocket.accept()
            threading.Thread(target=processRequests, args=(connection, address)).start()
        except Exception:
            print("Threadul principal a murit la generarea unui alt thread")

