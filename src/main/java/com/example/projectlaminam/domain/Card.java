package com.example.projectlaminam.domain;

import javax.persistence.*;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private String frontSide;
    private String backSide;

    @ManyToOne
    private Pack pack;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFrontSide() {
        return frontSide;
    }

    public void setFrontSide(String frontSide) {
        this.frontSide = frontSide;
    }

    public String getBackSide() {
        return backSide;
    }

    public void setBackSide(String backSide) {
        this.backSide = backSide;
    }

    public Pack getPack() {
        return pack;
    }

    public void setPack(Pack pack) {
        this.pack = pack;
    }
}
