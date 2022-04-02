package com.example.projectlaminam.repositories;

import com.example.projectlaminam.domain.Card;
import com.example.projectlaminam.domain.Pack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findAllByPack(Pack pack);
}
