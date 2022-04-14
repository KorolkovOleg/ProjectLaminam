package com.example.projectlaminam.repositories;

import com.example.projectlaminam.domain.Pack;
import com.example.projectlaminam.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackRepository extends JpaRepository<Pack, Long> {


    List<Pack> findAllByUsers(User user);
}
