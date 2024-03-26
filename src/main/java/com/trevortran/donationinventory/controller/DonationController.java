package com.trevortran.donationinventory.controller;

import com.trevortran.donationinventory.model.Donation;
import com.trevortran.donationinventory.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/donation")
public class DonationController {
    private final DonationService donationService;

    @Autowired
    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping("")
    public ResponseEntity<List<Donation>> getAllDonationsHandler() {
        return ResponseEntity.ok(donationService.getAll());
    }

    @PostMapping("")
    public ResponseEntity<Donation> saveDonationHandler(@RequestBody Donation donation) {
        Donation persistedDonation = donationService.save(donation);
        return ResponseEntity.ok(persistedDonation);
    }

    @DeleteMapping(value = "")
    public ResponseEntity<?> deleteDonationHandler(@RequestParam("donationId") UUID donationId) {
        donationService.delete(donationId);
        return ResponseEntity.ok().build();
    }
}
