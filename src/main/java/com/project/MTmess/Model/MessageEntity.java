package com.project.MTmess.Model;

import javax.persistence.*;

@Table(name = "Messages")
@Entity
public class MessageEntity {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;

    @Column
    private String content;

    @Column
    private String sender;

    @Column
    private String receiver;

    public MessageEntity() {
    }

    public MessageEntity(String content, String sender, String receiver) {
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    @Override
    public String toString() { // For debugging in console
        return "ChatMessage{" +
                "content='" + content + '\'' +
                ", sender='" + sender + '\'' +
                ", receiver='" + receiver + '\'' +
                '}';
    }
}
