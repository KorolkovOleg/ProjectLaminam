package com.example.projectlaminam.rest;

import com.example.projectlaminam.domain.Pack;
import com.example.projectlaminam.domain.User;
import com.example.projectlaminam.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.projectlaminam.repositories.PackRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackRestController {

    private final PackRepository packRepository;
    private final UserRepository userRepository;


    public PackRestController(PackRepository packRepository, UserRepository userRepository) {
        this.packRepository = packRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Pack> getPackages(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(RuntimeException::new);
        List<Pack> packages = packRepository.findAllByUsers(user);
        packages.forEach(System.out::println);
        return packages;
    }

    @GetMapping("/{packId}")
    public Pack getPack(@PathVariable("packId") Long id, @AuthenticationPrincipal UserDetails user) {
        Pack pack = packRepository.findById(id).orElseThrow(RuntimeException::new);
        if(pack.getUsers().stream().anyMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return pack;
        }
        return null;
    }

    @PostMapping
    public ResponseEntity createPack(@RequestBody Pack pack, @AuthenticationPrincipal UserDetails userDetails) throws URISyntaxException {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(RuntimeException::new);
        pack.getUsers().add(user);
        Pack savedPack = packRepository.save(pack);
        return ResponseEntity.created(new URI("/packages/" + savedPack.getId())).body(savedPack);
    }

    @PutMapping("/{packId}")
    public ResponseEntity updatePack(@PathVariable("packId") Long id, @RequestBody Pack pack, @AuthenticationPrincipal UserDetails user) {
        System.out.println(pack);
        Pack currentPack = packRepository.findById(id).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().anyMatch(u -> u.getUsername().equals(user.getUsername()))) {
            currentPack.setName(pack.getName());
            currentPack = packRepository.save(currentPack);
            System.out.println(currentPack);
            return ResponseEntity.ok(currentPack);
        }
        return ResponseEntity.status(403).build();
    }

    @DeleteMapping("/{packId}")
    public ResponseEntity deleteClient(@PathVariable("packId") Long id, @AuthenticationPrincipal UserDetails user) {
        Pack currentPack = packRepository.findById(id).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().anyMatch(u -> u.getUsername().equals(user.getUsername()))) {
            packRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(403).build();

    }

}
