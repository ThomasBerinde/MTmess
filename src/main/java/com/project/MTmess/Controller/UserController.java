package com.project.MTmess.Controller;

import com.project.MTmess.Model.UserEntity;
import com.project.MTmess.Service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    // Dependency injection of UserService object
    // We will have a UserService object which is created somewhere else
    @Autowired
    private UserService userService;

    // Method that lets the user send a request to the server for adding a specific user
    // Receives a parameter of type UserEntity in the body of the request, in JSON format
    @PostMapping("/add")
    public String add(@RequestBody UserEntity user){
        try {
            // Hashes the password that was given by the user in the request
            user.setHashedpassword( user.getHash( user.getHashedpassword() ) );
            userService.saveUser(user);
            return "User was added!";  // TO BE IMPLEMENTED: if user already exists, don't print this
        }catch ( Exception e ) {
            return "Failed to add user.";
        }
    }

    // Pass in the name as a parameter in the url to see if the user exists in the database
    // If they exist you'll get them, if they don't you'll get an empty page, but still code 200
    @GetMapping("/find")
    public ResponseEntity<UserEntity> findByName(@RequestParam String name){
        // Tries to get the user with the username "username"
        // It might return a UserEntity that is null, so we pass it to an Optional
        Optional<UserEntity> user = Optional.ofNullable(userService.findByName(name));

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Pass in the name and password (not hashed) as parameters in the url to see if the user exists in the database
    // If they exist you'll get them, if they don't you'll get an empty page, but still code 200
    @GetMapping("/find/log")
    public ResponseEntity<UserEntity> findByNameAndHashedpassword(@RequestParam String name, @RequestParam String password){
        Optional<UserEntity> user = Optional.ofNullable(userService.findByNameAndHashedpassword(name, password));

        if ( user.isPresent() ) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Fetch all entries in the user database
    @GetMapping("/find/all")
    public ResponseEntity<List<UserEntity>> findAll(){
        Optional<List<UserEntity>> users = Optional.ofNullable(userService.findAll());

        if ( users.isPresent() ) {
            return new ResponseEntity<>( users.get() , HttpStatus.OK );
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
