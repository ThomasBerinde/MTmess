package com.project.MTmess.Controller;

import com.project.MTmess.Exception.InvalidMessageException;
import com.project.MTmess.Model.MessageEntity;
import com.project.MTmess.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/add")
    public String add(@RequestBody MessageEntity message){

        try{
            messageService.saveMessage(message);
        }
        catch( InvalidMessageException e){
            return " Sender or Receiver are not friends! ";
        }

        return "Message was added";
    }

    @GetMapping("/find")
    public ResponseEntity<List<MessageEntity>> findBySenderOrReceiver(
            @RequestParam String sender,
            @RequestParam String receiver
    )
    {
        return new ResponseEntity<>(messageService.findAllBySenderOrReceiver(sender, receiver), HttpStatus.OK);
    }

    @GetMapping("/find/and")
    public ResponseEntity<List<MessageEntity>> findAllBySenderAndReceiverOrReceiverAndSender(
            @RequestParam String user1,
            @RequestParam String user2
    )
    {
        return new ResponseEntity<>(messageService.findAllBySenderAndReceiverOrReceiverAndSender(user1, user2, user1, user2), HttpStatus.OK);
    }
}
