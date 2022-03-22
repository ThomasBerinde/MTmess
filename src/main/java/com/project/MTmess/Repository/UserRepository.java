package com.project.MTmess.Repository;

import com.project.MTmess.Model.UserEntity;
import org.apache.catalina.User;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findByName(String name); // For routing socket communication
    UserEntity findByNameAndHashedpassword(String name, String hashedpassword); // For client authentication
}
