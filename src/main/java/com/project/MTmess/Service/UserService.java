package com.project.MTmess.Service;

import com.project.MTmess.Model.UserEntity;

import java.util.List;

public interface UserService {

    UserEntity saveUser( UserEntity user );
    UserEntity findByName(String name);
    UserEntity findByNameAndHashedpassword(String name, String hashed_password);
    List<UserEntity> findAll();

}
