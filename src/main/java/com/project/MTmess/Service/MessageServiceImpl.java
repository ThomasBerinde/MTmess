package com.project.MTmess.Service;

import com.project.MTmess.Exception.InvalidMessageException;
import com.project.MTmess.Model.MessageEntity;
import com.project.MTmess.Repository.MessageRepository;
import com.project.MTmess.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public MessageEntity saveMessage(MessageEntity message) throws InvalidMessageException {

        // Check if sender and receiver are existing users, using the API + Spring RestTemplate
        String url = "http://localhost:8080/friendship/find?user1=+ " + message.getSender() + "&user2=" + message.getReceiver();

        RestTemplate restTemplate = new RestTemplate();

        String req = restTemplate.getForObject(url, String.class);

        if ( req == null )  throw new InvalidMessageException("Sender and receiver are not friends...");

        return messageRepository.save(message);
    }

    @Override
    public List<MessageEntity> findAllBySenderOrReceiver(String sender, String receiver) {
        return messageRepository.findAllBySenderOrReceiver(sender, receiver);
    }

    @Override
    public List<MessageEntity> findAllBySenderAndReceiverOrReceiverAndSender(String user11, String user12, String user21, String user22) {
        return messageRepository.findAllBySenderAndReceiverOrReceiverAndSender(user11, user12, user21, user22);
    }
}
