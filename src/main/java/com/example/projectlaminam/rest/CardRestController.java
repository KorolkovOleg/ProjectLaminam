package com.example.projectlaminam.rest;

import com.example.projectlaminam.domain.Card;
import com.example.projectlaminam.domain.Pack;
import com.example.projectlaminam.repositories.CardRepository;
import com.example.projectlaminam.repositories.PackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<Card>> getCards(@PathVariable("packId") Long packId,
                                               @AuthenticationPrincipal UserDetails user,
                                               @RequestParam("isTimelyOnly") Boolean isTimelyOnly) throws RuntimeException {

        Pack pack = packRepository.findById(packId).orElseThrow(RuntimeException::new);
        if(pack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return ResponseEntity.status(403).build();
        }

        if(isTimelyOnly) {
            return ResponseEntity.ok(cardRepository.findAllByPack(pack)
                    .stream()
                    .filter(c -> c.getNextRepeatDate().before(new Date()))
                    .collect(Collectors.toList()));
        } else {
            return ResponseEntity.ok(cardRepository.findAllByPack(pack));
        }
    }


    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody Card card,
                                           @PathVariable("packId") Long packId,
                                           @AuthenticationPrincipal UserDetails user) throws URISyntaxException, RuntimeException {

        Pack currentPack = packRepository.findById(packId).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return ResponseEntity.status(403).build();
        }

        card.setPack(currentPack);
        card.setNextRepeatDate(new Date());
        Card savedCard = cardRepository.save(card);
        return ResponseEntity.ok(savedCard);
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<Card> deleteCard(@PathVariable("packId") Long packId,
                                           @PathVariable("cardId") Long cardId,
                                           @AuthenticationPrincipal UserDetails user) {

        Pack currentPack = packRepository.findById(packId).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return ResponseEntity.status(403).build();
        }

        cardRepository.deleteById(cardId);
        return ok().build();
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<Card> updateCard(@RequestBody Card card,
                                           @PathVariable("cardId") Long cardId,
                                           @PathVariable("packId") Long packId,
                                           @AuthenticationPrincipal UserDetails user) {

        Pack currentPack = packRepository.findById(packId).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return ResponseEntity.status(403).build();
        }else if (card == null || !Objects.equals(card.getId(), cardId)) {
            return ResponseEntity.notFound().build();
        }

        Card currentCard = cardRepository.findById(card.getId()).orElseThrow(RuntimeException::new);
        currentCard.setLabel(card.getLabel());
        currentCard.setFrontSide(card.getFrontSide());
        currentCard.setBackSide(card.getBackSide());
        currentCard.setNextRepeatDate(card.getNextRepeatDate());
        currentCard = cardRepository.save(currentCard);

        return ResponseEntity.ok(currentCard);

    }
}
