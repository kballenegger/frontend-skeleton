(set! exports {})

; react macros...

(defmacro hash-map-pairs
  "make a hash map from its arguments. each argument is a tuple (key value)"
  [ & args ]
  (let [new-args (map (fn [a] (let [f (first a), s (second a)]
                                `(set! (aget h ~f) ~s)
                                )) args)]
    `(let [h {}] ~@new-args h)
    )
  )

(defmacro def-react-class
  "macro to create a react class"
  [ name & args ]
  (let [; if the second element after the key name is a vector, treat as a fn
        process-value (fn [v] (if (and (vector? (second v)) (second (rest v)))
                                (list `fn (first v) (rest v))
                                (second v)
                                )),
        new-args (map
                  ; map = for each method, make a named property
                  (fn [a] (list (keyword (first a)) (process-value a))) args)
        ]
    `(def ~name (.createClass React (hash-map-pairs ~@new-args)))
    )
  )

(defmacro dom
  "xml el"
  [el-name attrs & body]
  (let [react-full-sym (str 'React.DOM. el-name)]
    (concat `(~react-full-sym ~attrs) body)
    )
  )

(defmacro debug
  "like .tap {|x| p x } in ruby"
  [& args]
  (let [n (name (first args))]
    `(let [x ~(concat (list) args)] (console.log (+ "Debug " ~n ": " x)) x)
    )
  )
