package com.example.projectlaminam.repositories;

import com.example.projectlaminam.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
