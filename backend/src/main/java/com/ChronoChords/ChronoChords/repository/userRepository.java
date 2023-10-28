package com.ChronoChords.ChronoChords.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import com.ChronoChords.ChronoChords.model.User;

import java.util.Optional;
@EnableJpaRepositories
@Repository
public interface userRepository extends JpaRepository<User, Long>// user is the entity, Long is primary key for ID in table
{
    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
