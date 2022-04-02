package com.example.projectlaminam.rest;

import com.example.projectlaminam.domain.Card;
import com.example.projectlaminam.domain.Pack;
import com.example.projectlaminam.repositories.CardRepository;
import com.example.projectlaminam.repositories.PackRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

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
        return ok().build();
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<Card> updateCard(@RequestBody Card card,
                                           @PathVariable("cardId") Long cardId,
                                           @PathVariable("packId") Long packId) {

        if (card != null && Objects.equals(card.getId(), cardId)) {
            Card currentCard = cardRepository.findById(card.getId()).orElseThrow(RuntimeException::new);
            currentCard.setLabel(card.getLabel());
            currentCard.setFrontSide(card.getFrontSide());
            currentCard.setBackSide(card.getBackSide());
            currentCard = cardRepository.save(currentCard);
            return ResponseEntity.ok(currentCard);
        }
        return ResponseEntity.notFound().build();
    }
}
