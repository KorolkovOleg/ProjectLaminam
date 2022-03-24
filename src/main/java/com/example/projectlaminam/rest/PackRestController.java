package com.example.projectlaminam.rest;

import com.example.projectlaminam.domain.Pack;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.projectlaminam.repositories.PackRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackRestController {

    private final PackRepository packRepository;

    public PackRestController(PackRepository packRepository) {
        this.packRepository = packRepository;
    }

    @GetMapping
    public List<Pack> getPackages() {

        return packRepository.findAll();
    }

    @GetMapping("/{id}")
    public Pack getPack(@PathVariable Long id) {
        return packRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createPack(@RequestBody Pack pack) throws URISyntaxException {
        Pack savedPack = packRepository.save(pack);
        return ResponseEntity.created(new URI("/packages/" + savedPack.getId())).body(savedPack);
    }

    @PutMapping("/{id}")
    public ResponseEntity updatePack(@PathVariable Long id, @RequestBody Pack pack) {

        return ResponseEntity.ok(pack);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        packRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
