package com.example.projectlaminam.rest;

import com.example.projectlaminam.domain.Card;
import com.example.projectlaminam.domain.Pack;
import com.example.projectlaminam.repositories.CardRepository;
import com.example.projectlaminam.repositories.PackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/packages/{packId}/cards")
public class CardRestController {

    private final CardRepository cardRepository;

    public CardRestController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
