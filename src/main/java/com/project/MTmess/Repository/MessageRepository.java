package com.project.MTmess.Repository;

import com.project.MTmess.Model.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {
    List<MessageEntity> findAllBySenderOrReceiver(String sender, String receiver);
    List<MessageEntity> findAllBySenderAndReceiverOrReceiverAndSender(String user11, String user12, String user21, String user22);
}
