; note: this iteration doesn't work properly.
; looks like i don't understand exactly how react.js works for settings dom element properties


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
    (set! (aget attrs :children) body)
    `(~react-full-sym ~attrs)
    )
  )

; implementation

;(def converter (new Showdown.converter))
(def converter {:makeHtml (fn [x] x)})
(defn md->html
  "convert markdown to html using showdown"
  [md]
  (converter.makeHtml md)
  )

(def-react-class Comment
  (render []
          (dom div {:className :author}
               this.props.name)
          (dom div {:className :text}
               (md->html this.props.text)
               )
          )
  (name :hello)
  (somevector [])
  )

(def-react-class CommentList
  (render []
          (dom div {}
               (Comment)
               (Comment {:name "second", :body "#onetwo\nthree"})
               (Comment {:name "third"})
               )
          )
  )

(def-react-class CommentBox
  (render []
          (dom div {:className :commentBox}
               "Comments!"
               (CommentList {:name "World"})
               )
          )
  )

(React.renderComponent (CommentBox), document.body)

