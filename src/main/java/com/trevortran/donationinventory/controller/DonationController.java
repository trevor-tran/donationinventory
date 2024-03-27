package com.trevortran.donationinventory.controller;

import com.trevortran.donationinventory.model.Donation;
import com.trevortran.donationinventory.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/donation")
public class DonationController {
    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {
        StringTrimmerEditor stringTrimmerEditor = new
                StringTrimmerEditor(true);
        dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

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
    public ResponseEntity<Donation> saveDonationHandler(@RequestBody @Valid Donation donation, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }
        Donation persistedDonation = donationService.save(donation);
        return ResponseEntity.ok(persistedDonation);
    }

    @DeleteMapping(value = "/{donationId}")
    public ResponseEntity<?> deleteDonationHandler(@PathVariable("donationId") UUID donationId) {
        donationService.delete(donationId);
        return ResponseEntity.ok().build();
    }
}
