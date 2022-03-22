package com.project.MTmess.Service;

import com.project.MTmess.Exception.DuplicateFriendshipException;
import com.project.MTmess.Exception.InvalidFriendshipException;
import com.project.MTmess.Exception.SelfFriendshipException;
import com.project.MTmess.Model.FriendshipEntity;
import com.project.MTmess.Repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FriendshipServiceImpl implements FriendshipService{

    @Autowired
    FriendshipRepository friendshipRepository;

    @Override
    public FriendshipEntity saveFriendship (FriendshipEntity friendship) throws
            InvalidFriendshipException,
            SelfFriendshipException,
            DuplicateFriendshipException {
        // Check if users exist

        String url = "http://localhost:8080/user/find?name={q}";
        String url2 = "http://localhost:8080/friendship/find/and?user1=" + friendship.getUser1() + "&user2=" + friendship.getUser2();

        RestTemplate restTemplate = new RestTemplate();

        String req = restTemplate.getForObject(url, String.class, friendship.getUser1());
        String req2 = restTemplate.getForObject(url, String.class, friendship.getUser2());
        String req3 = restTemplate.getForObject(url2, String.class);

        if ( req == null || req2 == null )  throw new InvalidFriendshipException("Users don't exist!"); // Users dont exist - Return exception
        if ( req3 != null) throw new DuplicateFriendshipException("Friendship already exists!");

        if (friendship.getUser1().equals(friendship.getUser2())){ // Users are the same
            throw new SelfFriendshipException("User1 is equal to User2... Such a shame");
        }

        return friendshipRepository.save(friendship);
    }

    @Override
    public List<FriendshipEntity> findAllByUser1OrUser2(String user1, String user2){
        return friendshipRepository.findAllByUser1OrUser2(user1, user2);
    }

    @Override
    public FriendshipEntity findAllByUser1AndUser2(String user1, String user2) {
        return friendshipRepository.findAllByUser1AndUser2(user1, user2);
    }
}
