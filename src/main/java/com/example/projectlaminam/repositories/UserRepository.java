package com.example.projectlaminam.repositories;

import com.example.projectlaminam.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
