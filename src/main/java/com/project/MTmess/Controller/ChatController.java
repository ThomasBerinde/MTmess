package com.project.MTmess.Controller;

import com.project.MTmess.Model.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@RestController // Handles incoming messages and sends them to the users.
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate; // wrapper for socket logic


    @MessageMapping("/chat/{username}")  // same as configured endpoint for the broker
    public String sendMessage(@DestinationVariable String username, MessageEntity message) throws IOException {
        System.out.println("handling sent message..." + message + "to: " + username);

        // Check if username exists ( using GET requests to our API )
        // This part should be written in a ChatService class... It is not the controllers job to do this kind of logic!
        URL url = new URL("http://localhost:8080/user/find?name=" + username); // Single parameter so no need to manually forge map of parameters

        HttpURLConnection connection = (HttpURLConnection) url.openConnection(); // This just creates a connection, doesn't open it. Request still needs to be forged
        connection.setRequestMethod("GET");

        connection.setDoInput(true); // For GET requests.

        BufferedReader inStream = new BufferedReader( new InputStreamReader( connection.getInputStream() ) ); // Connection starts
        String buffer;
        StringBuffer response = new StringBuffer();
        while ( ( buffer = inStream.readLine()) != null ){ // Read output line by line
            response.append(buffer);
        }
        inStream.close();


        connection.disconnect();

        if ( response.length() != 0 )
        {
            // continue, user was found.
            simpMessagingTemplate.convertAndSend("/topic/messages/" + username, message);
            return "Success!";
        }
        else
        {
            System.out.println("User" + username + "doesn't exist."); // Debug
            return "User " + username + " doesn't exist."; // ToImpl : Throw some exception
        }


    }
}
