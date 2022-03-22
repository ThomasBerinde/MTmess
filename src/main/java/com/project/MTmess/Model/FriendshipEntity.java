package com.project.MTmess.Model;

import com.project.MTmess.Exception.InvalidFriendshipException;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;

@Table(name = "Friendships")
@Entity
public class FriendshipEntity {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    // For simplicity, we use strings instead of user entities
    // and take care of the logic in a different place
    // We know it's not ok... sorry. We will implement it in a
    // further update
    @Column
    private String user1;

    @Column
    private String user2;

    public FriendshipEntity() {}

    public FriendshipEntity(String user1, String user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getUser1() {
        return user1;
    }

    public void setUser1(String user1){ this.user1 = user1;}

    public String getUser2() {
        return user2;
    }

    public void setUser2(String user2) {
        this.user2 = user2;
    }
}
