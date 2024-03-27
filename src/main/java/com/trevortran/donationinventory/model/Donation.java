package com.trevortran.donationinventory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @Pattern(regexp = "^[A-Za-z]+$", message = "Only alphabetic allowed")
    String donor;
    @NotBlank(message = "Required")
    String type;
    @Min(1)
    double amount;
    @Past @NotNull(message = "Required")
    LocalDate date;
}
