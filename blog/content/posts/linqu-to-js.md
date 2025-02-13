+++
title = 'Linqu to JavaScript'
date = 2025-01-01T22:30:59Z
draft = false
summary = 'Linqu to JavaScript functions mapping'
+++

### 1. **Select**

- **LINQ**: `.Select(x => x * 2)`
- **JavaScript**: `.map(x => x * 2)`

---

### 2. **Where**

- **LINQ**: `.Where(x => x > 10)`
- **JavaScript**: `.filter(x => x > 10)`

---

### 3. **First**

- **LINQ**: `.First()`
- **JavaScript**: `[0]` (for first item) or `.find(() => true)` (for first that matches a condition)

---

### 4. **FirstOrDefault**

- **LINQ**: `.FirstOrDefault()`
- **JavaScript**: `.find(() => true) || defaultValue`

---

### 5. **Last**

- **LINQ**: `.Last()`
- **JavaScript**: `[array.length - 1]` or `.slice(-1)[0]`

---

### 6. **LastOrDefault**

- **LINQ**: `.LastOrDefault()`
- **JavaScript**: `.slice(-1)[0] || defaultValue`

---

### 7. **SelectMany**

- **LINQ**: `.SelectMany(x => x.Items)`
- **JavaScript**: `.flatMap(x => x.Items)`

---

### 8. **OrderBy**

- **LINQ**: `.OrderBy(x => x.Prop)`
- **JavaScript**: `.sort((a, b) => a.Prop - b.Prop)` (for ascending order)

---

### 9. **OrderByDescending**

- **LINQ**: `.OrderByDescending(x => x.Prop)`
- **JavaScript**: `.sort((a, b) => b.Prop - a.Prop)` (for descending order)

---

### 10. **All**

- **LINQ**: `.All(x => x > 10)`
- **JavaScript**: `.every(x => x > 10)`

---

### 11. **Any**

- **LINQ**: `.Any(x => x > 10)`
- **JavaScript**: `.some(x => x > 10)`

---

### 12. **Count**

- **LINQ**: `.Count(x => x > 10)`
- **JavaScript**: `.filter(x => x > 10).length`

---

### 13. **Sum**

- **LINQ**: `.Sum(x => x.Prop)`
- **JavaScript**: `.reduce((acc, x) => acc + x.Prop, 0)`

---

### 14. **Max**

- **LINQ**: `.Max(x => x.Prop)`
- **JavaScript**: `.reduce((max, x) => x.Prop > max ? x.Prop : max, -Infinity)`

---

### 15. **Min**

- **LINQ**: `.Min(x => x.Prop)`
- **JavaScript**: `.reduce((min, x) => x.Prop < min ? x.Prop : min, Infinity)`

---

### 16. **Distinct**

- **LINQ**: `.Distinct()`
- **JavaScript**: `[...new Set(array)]`

---

### 17. **GroupBy**

- **LINQ**: `.GroupBy(x => x.Prop)`
- **JavaScript**:
  ```javascript
  array.reduce((grouped, x) => {
    const key = x.Prop;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(x);
    return grouped;
  }, {});
  ```

---

### 18. **Aggregate**

- **LINQ**: `.Aggregate((acc, x) => acc + x.Prop)`
- **JavaScript**: `.reduce((acc, x) => acc + x.Prop)`

---

### 19. **Take**

- **LINQ**: `.Take(3)`
- **JavaScript**: `.slice(0, 3)`

---

### 20. **Skip**

- **LINQ**: `.Skip(3)`
- **JavaScript**: `.slice(3)`