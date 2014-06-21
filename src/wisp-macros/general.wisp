(defmacro ->
  [& operations]
  (reduce
    (fn [form operation]
      (cons (first operation)
            (cons form (rest operation))))
    (first operations)
    (rest operations)))

(defmacro ->>
  [& operations]
  (reduce
    (fn [form operation]
      (cons (first operation)
            (cons (rest operation) form))) ; if i use concat here it crashes? wtf
    (first operations)
    (rest operations)))
