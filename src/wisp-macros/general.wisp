(defmacro ->
  [& operations]
  (reduce
    (fn [form operation]
      (cons (first operation)
            (cons form (rest operation))))
    (first operations)
    (rest operations)))

; FIXME: this is brokeb... can't figure it out right now
; TODO: naming; should be called ->>
(defmacro code-reverse
  [& operations]
  (reduce
    (fn [form operation]
      (cons (first operation)
            (conj (rest operation) form)
            ))
    (first operations)
    (rest operations)))
