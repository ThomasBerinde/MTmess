package com.project.MTmess.Repository;

import com.project.MTmess.Model.FriendshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<FriendshipEntity, Integer> {
    List<FriendshipEntity> findAllByUser1OrUser2(String user1, String user2);
    FriendshipEntity findAllByUser1AndUser2(String user1, String user2);
}
