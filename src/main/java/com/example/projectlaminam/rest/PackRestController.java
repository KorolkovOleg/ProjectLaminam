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
    public Pack getPack(@PathVariable("packId") Long id,
                        @AuthenticationPrincipal UserDetails user) {
        Pack pack = packRepository.findById(id).orElseThrow(RuntimeException::new);
        if(pack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return null;
        }

        return pack;
    }

    @PostMapping
    public ResponseEntity<Pack> createPack(@RequestBody Pack pack,
                                     @AuthenticationPrincipal UserDetails userDetails) throws URISyntaxException {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(RuntimeException::new);
        pack.getUsers().add(user);
        Pack savedPack = packRepository.save(pack);
        return ResponseEntity.created(new URI("/packages/" + savedPack.getId())).body(savedPack);
    }

    @PutMapping("/{packId}")
    public ResponseEntity<Pack> updatePack(@PathVariable("packId") Long id,
                                     @RequestBody Pack pack,
                                     @AuthenticationPrincipal UserDetails user) {
        System.out.println(pack);
        Pack currentPack = packRepository.findById(id).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return ResponseEntity.status(403).build();
        }

        currentPack.setName(pack.getName());
        currentPack = packRepository.save(currentPack);
        System.out.println(currentPack);
        return ResponseEntity.ok(currentPack);
    }

    @DeleteMapping("/{packId}")
    public ResponseEntity deleteClient(@PathVariable("packId") Long id,
                                       @AuthenticationPrincipal UserDetails user) {
        Pack currentPack = packRepository.findById(id).orElseThrow(RuntimeException::new);
        if(currentPack.getUsers().stream().noneMatch(u -> u.getUsername().equals(user.getUsername()))) {
            return ResponseEntity.status(403).build();
        }

        packRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
