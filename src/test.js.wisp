;; implementation
(set! empty-hash {})

;;(def converter (new Showdown.converter))
(def converter {:makeHtml (fn [x] (+ x " - BLAH"))})
(defn md->html
  "convert markdown to html using showdown"
  [md]
  (converter.makeHtml md)
  )

(def-react-class Comment
  (render []
          (dom div {:className :comment}
               (dom div {:className :author}
                    this.props.author)
               (dom div {:className :text}
                    (md->html this.props.text)
                    )
               ))
  (name :hello) ; just to test the macro
  (somevector []) ; just to test the macro
  )

(def-react-class CommentInput
  (render []
          (dom div {} "Temporary: will be a comment input box")
          ))

(def-react-class CommentList
  (render []
          (dom div {}
               (.map this.props.data #(Comment %))
               )
          )
  )

(def test-data [
                {:author "Brandon Goldman", :text "I am Brandon!"}
                {:author "George Burke", :text "I am George!"}
                {:author "Kenneth Ballenegger", :text "I am Kenneth!"}
                ])

(def-react-class CommentBox
  (render []
          (dom div {:className :comment-box}
               (dom h1 empty-hash "Comments:") ; NOTE: hack around stupid compiler crasher bug
               (CommentList {:data this.props.data})
               (CommentInput)
               )
          )
  )

(React.renderComponent
  (CommentBox {:data test-data})
  (document.getElementById "app"))
