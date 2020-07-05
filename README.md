# conFusion-Server

A NodeJS secure server for a restaurant application developed using Express framework with OAuth authentication.

## Installation
1. ### Installing Node
    To install Node on your machine, go to https://nodejs.org and click on the Download button. Depending on your computer's platform (Windows, MacOS or Linux), the appropriate installation package must be downloaded.
2. ### Verifying the Node Installation
    Open a terminal window on your machine. If you are using a Windows machine, open a cmd window or PowerShell window with admin privileges.
    To ensure that your NodeJS setup is working correctly, type the following at the command prompt to check for the version of Node and NPM
        
        node -v
        npm -v
3. ### Cloning the repository

        git clone https://github.com/sathya5278/conFusion-Server.git
        
4. ### Installing project
    Open a terminal in the root directory of the project and run these commands

    #### Installing dependicies

        npm install 

    #### Generating Private Key and Certificate
    Go to the bin folder and then create the private key and certificate by typing the following at the prompt:
        
        openssl genrsa 1024 > private.key

        openssl req -new -key private.key -out cert.csr

        openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

    #### Starting the server
    Check the output at https://localhost:3443 in your browser.
 
        npm start

    The server will start running.

## Contributing
Contributions make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GNU GPL License.

## Contact

Sathya M - [@sathya5278](https://github.com/sathya5278)

Project Link: [https://github.com/sathya5278/conFusion-Server](https://github.com/sathya5278/conFusion-Server)
