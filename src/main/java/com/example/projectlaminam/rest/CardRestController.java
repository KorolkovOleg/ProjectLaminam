package com.example.projectlaminam.rest;

import com.example.projectlaminam.domain.Card;
import com.example.projectlaminam.domain.Pack;
import com.example.projectlaminam.repositories.CardRepository;
import com.example.projectlaminam.repositories.PackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/packages/{packId}/cards")
public class CardRestController {

    private final CardRepository cardRepository;
    private final PackRepository packRepository;

    public CardRestController(CardRepository cardRepository, PackRepository packRepository) {
        this.cardRepository = cardRepository;
        this.packRepository = packRepository;
    }

    @GetMapping
    public List<Card> getCards(@PathVariable("packId") Long packId) {
        return cardRepository.findAll();
    }

    @PostMapping
    public ResponseEntity createCard(@RequestBody Card card, @PathVariable("packId") Long packId) throws URISyntaxException {

        Pack currentPack = packRepository.findById(packId).get();
        card.setPack(currentPack);
        Card savedCard = cardRepository.save(card);
        return ResponseEntity.ok(savedCard);
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity deleteCard(@PathVariable("cardId") Long cardId) {
        cardRepository.deleteById(cardId);
        return ResponseEntity.ok().build();
    }
}
