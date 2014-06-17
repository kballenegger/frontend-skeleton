;; implementation

;;(def converter (new Showdown.converter))
(def converter {:makeHtml (fn [x] (+ x " - BLAH"))})
(defn md->html
  "convert markdown to html using showdown"
  [md]
  (converter.makeHtml md)
  )

(def-react-class Comment
  (render []
          (dom div {}
               (dom div {:className :author}
                    this.props.name)
               (dom div {:className :text}
                    (md->html this.props.text)
                    )
               ))
  (name :hello) ; just to test the macro
  (somevector []) ; just to test the macro
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

(React.renderComponent
  (CommentBox)
  (document.getElementById "app"))
