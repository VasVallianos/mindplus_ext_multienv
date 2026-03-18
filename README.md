# Gravity Multifunctional Environmental Sensor
## DFRobot SEN0501 — Τεχνική Τεκμηρίωση

---

## Τι είναι το SEN0501;

Το SEN0501 είναι ένας **5-σε-1 περιβαλλοντικός αισθητήρας** — συνδυάζει 4 ξεχωριστά chips αισθητήρων σε ένα μικρό PCB και επικοινωνεί μέσω I²C ή UART. Ένας ενσωματωμένος MCU μετατρέπει τα ακατέργαστα δεδομένα σε τυπικές μονάδες — δεν χρειάζεται καμία μετατροπή.

| Chip | Μετράει | Μονάδα |
|---|---|---|
| **SHTC3** | Θερμοκρασία | °C ή °F |
| **SHTC3** | Υγρασία | % RH |
| **BMP280** | Ατμοσφαιρική πίεση | kPa ή hPa |
| **BMP280** | Υψόμετρο | m |
| **VEML7700** | Φωτεινότητα | lux |
| **LTR390-UV-01** | UV ένταση | mW/cm² |

> ⚠️ **Σημείωση έκδοσης:** V1.0 = ML8511 UV sensor / V2.0 = LTR390-UV-01.

---

## Τεχνικά Χαρακτηριστικά

| Παράμετρος | Τιμή |
|---|---|
| Τάση τροφοδοσίας | 3,3V – 5V |
| Επικοινωνία | I²C ή UART (DIP switch επιλογή) |
| I²C διεύθυνση | 0x22 (default) |
| UART baud rate | 9600 bps |
| Θερμοκρασία εύρος | -40°C ~ +80°C |
| Θερμοκρασία ακρίβεια | ±0,3°C |
| Υγρασία εύρος | 0% ~ 100% RH |
| Υγρασία ακρίβεια | ±3% RH |
| Πίεση εύρος | 300 ~ 1100 hPa |
| Φωτεινότητα εύρος | 0 ~ 120.000 lux |
| UV εύρος | 0 ~ 16 mW/cm² (LTR390) |
| Connector | 4-pin Gravity |
| Βιβλιοθήκη | DFRobot_EnvironmentalSensor |

---

## Σύνδεση

### I²C (προτεινόμενο για Arduino UNO)

```
SEN0501      →   Arduino / IO Shield
────────────────────────────────────
VCC          →   5V (ή 3,3V)
GND          →   GND
SDA (D/T)    →   A4
SCL (C/R)    →   A5
```

> DIP switch στη θέση **I²C** (αριστερά).

### UART (για Arduino UNO με SoftwareSerial)

```
SEN0501      →   Arduino
────────────────────────
VCC          →   5V
GND          →   GND
TX (D/T)     →   D4 (RX του SoftwareSerial)
RX (C/R)     →   D5 (TX του SoftwareSerial)
```

> DIP switch στη θέση **UART** (δεξιά). 
> ⚠️ Δεν έχει ελεγχθεί η σωστή λειτουργία.

---

## Βιβλιοθήκη — DFRobot_EnvironmentalSensor

## Κύριες Συναρτήσεις Βιβλιοθήκης

| Συνάρτηση | Παράμετροι | Επιστρέφει |
|---|---|---|
| `sensor.begin()` | — | 0=OK, -1=FAIL |
| `sensor.getTemperature(unit)` | `TEMP_C` ή `TEMP_F` | float °C / °F |
| `sensor.getHumidity()` | — | float % RH |
| `sensor.getAtmospherePressure(unit)` | `KPA` ή `HPA` | float kPa / hPa |
| `sensor.getElevation()` | — | float m |
| `sensor.getLuminousIntensity()` | — | float lux |
| `sensor.getUltravioletIntensity()` | — | float mW/cm² |

---

## Μετατροπές Μονάδων

### Πίεση
```
1 kPa  = 10 hPa
1 hPa  = 100 Pa
1013 hPa = φυσιολογική πίεση επιπέδου θάλασσας
```

### Υψόμετρο από πίεση (barometric formula)
```
h (m) = 44330 × (1 - (P / P0)^0.1903)

Όπου:
P  = μετρούμενη πίεση (hPa)
P0 = πίεση αναφοράς επιπέδου θάλασσας (1013,25 hPa)
```
Η βιβλιοθήκη υπολογίζει αυτόματα το υψόμετρο με `getElevation()`.

## SCI DAQ (DFR0999) — getValue() Strings

Αν ο SEN0501 συνδεθεί στο DFR0999, τα διαθέσιμα strings είναι:

| String | Τιμή | Μονάδα |
|---|---|---|
| `"Temp_Air"` | Θερμοκρασία | °C |
| `"Humi_Air"` | Υγρασία | % |
| `"Pressure"` | Ατμοσφαιρική πίεση | hPa |
| `"Altitude"` | Υψόμετρο | m |
| `"Light"` | Φωτεινότητα | lux |
| `"UV"` | UV ένταση | mW/cm² |

> ⚠️ Αν έχεις και SEN0228 (VEML7700) στο ίδιο DFR0999, και οι δύο δίνουν `"Light"` — χρησιμοποίησε `ePort2` / `ePort3` για να τους ξεχωρίσεις.

---

## Mind+ Blocks

Τα blocks για τον SEN0501 στο Mind+:

| Block | Συνάρτηση | Επιστρέφει |
|---|---|---|
| `getTemperature(TEMP_C)` | Θερμοκρασία σε °C | float |
| `getTemperature(TEMP_F)` | Θερμοκρασία σε °F | float |
| `getHumidity()` | Υγρασία | float |
| `getAtmospherePressure(KPA)` | Πίεση σε kPa | float |
| `getAtmospherePressure(HPA)` | Πίεση σε hPa | float |
| `getElevation()` | Υψόμετρο σε m | float |
| `getLuminousIntensity()` | Φωτεινότητα σε lux | float |
| `getUltravioletIntensity()` | UV σε mW/cm² | float |

---

## Συχνά Προβλήματα

| Πρόβλημα | Αιτία | Λύση |
|---|---|---|
| `begin()` επιστρέφει -1 | Λάθος DIP switch ή καλώδια | Έλεγξε I²C / UART επιλογή και pins |
| Υψόμετρο λάθος | Τοπική πίεση ≠ 1013 hPa | Βαθμονόμησε με τοπική πίεση |
| UV = 0 | V1.0 vs V2.0 σύγχυση | Βεβαιώσου ότι καλείς σωστή παράμετρο |
| Θερμοκρασία υψηλή | Αυτοθέρμανση από Arduino | Απομάκρυνε από πηγές θερμότητας |
| I²C conflict | Άλλη συσκευή στο 0x22 | Άλλαξε διεύθυνση ή χρησιμοποίησε multiplexer |

---

*Τεκμηρίωση βασισμένη στο επίσημο DFRobot wiki και GitHub για SEN0501.*
*Τελευταία ενημέρωση: Μάρτιος 2026*
