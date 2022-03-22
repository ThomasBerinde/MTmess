package com.project.MTmess.Controller;

import com.project.MTmess.Exception.DuplicateFriendshipException;
import com.project.MTmess.Exception.InvalidFriendshipException;
import com.project.MTmess.Exception.SelfFriendshipException;
import com.project.MTmess.Model.FriendshipEntity;
import com.project.MTmess.Service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friendship")
@CrossOrigin
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @PostMapping("/add")
    public String add(@RequestBody FriendshipEntity friendship){
        try{
            friendshipService.saveFriendship(friendship);
            String user1copy = friendship.getUser1();
            String user2copy = friendship.getUser2();
            FriendshipEntity friendshipCopy = new FriendshipEntity(user2copy, user1copy);
            friendshipService.saveFriendship(friendshipCopy);

            return "Added friend!";
        }
        catch ( InvalidFriendshipException e) {
            return "Error : Users don't exist!";
        }
        catch ( SelfFriendshipException e){
            return "Error : User1 is the same with User2!";
        }
        catch ( DuplicateFriendshipException e) {
            return "Error: Friendship already exists!";
        }

    }

    @GetMapping("/find")  // change path to make it more suggestive
    public ResponseEntity<List<FriendshipEntity>> findAllByUser1OrUser2(@RequestParam String user1, @RequestParam String user2) {
        return new ResponseEntity<>(friendshipService.findAllByUser1OrUser2(user1, user2), HttpStatus.OK);
    }

    @GetMapping("/find/and")  //
    public ResponseEntity<FriendshipEntity> findAllByUser1AndUser2(@RequestParam String user1, @RequestParam String user2) {
        return new ResponseEntity<>(friendshipService.findAllByUser1AndUser2(user1, user2), HttpStatus.OK);
    }
}
