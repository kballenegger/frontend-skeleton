;(ns freshpay.app
  ;(:require [wisp.src.sequence :all]))

;; implementation
(set! empty-hash {})

;(console.log (map inc [1 2 3]))

;; This converts markdown to HTML. This is a mock parser.
;;
(def converter {:makeHtml (fn [x] (+ x " - parsed"))})
(defn md->html
  "convert markdown to html using showdown"
  [md]
  (converter.makeHtml md))

;; The Comment component class represents a comment instance.
;;
(def-react-class Comment
  ;; Renders the component.
  (render []
          (dom div {:className :comment}
               (dom div {:className :author}
                    this.props.author)
               (dom div {:className :text}
                    (md->html this.props.text)))))

;; CommentInput is the form in which a user types in comments.
;;
(def-react-class CommentInput
  ;; This gets executed when the form is submitted.
  (submit []
          (let [ ; grab the dom nodes and the values
                author-dom (.getDOMNode this.refs.author)
                author (.trim (:value author-dom))
                text-dom (.getDOMNode this.refs.text)
                text (.trim (:value text-dom))
                ]
            ;; when both text and author are set, callback
            (if (and text author)
              (let []
                (set! (aget author-dom :value) "") ; and clear the fields
                (set! (aget text-dom :value) "")
                (this.props.callback {:author author, :text text})
                ))
            false) ; always return false to prevent a redirect.
          )
  ;; Renders the component.
  (render []
          (dom form {:className :comment-form, :onSubmit this.submit}
               (dom input {:type "text", :placeholder "Name", :ref :author})
               (dom input {:type "text", :placeholder "Say something...", :ref :text})
               (dom input {:type "submit", :value "Post"})
               )))

;; This represents the list of comments.
;;
(def-react-class CommentList
  ;; Renders the component.
  (render []
          (dom div {}
               (.map this.props.data #(Comment %)))))


;; This is the entire commenting module. All functionality is encapsulated into
;; this.
;;
(def-react-class CommentBox

  ;; This is the callback implementation for when a comment is added.
  (comments-updated [comment]
                    (this.setState {:data (.concat this.state.data comment)}))

  ;; Sets the intial state. Typically this would return an empty array, but
  ;; here I'm starting with mock comments.
  (getInitialState []
                   {:data [{:author "Brandon Goldman", :text "I am Brandon!"}
                           {:author "George Burke", :text "I am George!"}
                           {:author "Kenneth Ballenegger", :text "I am Kenneth!"}
                           ]})

  ;; Renders the component.
  (render []
          (dom div {:className :comment-box}
               (dom h1 empty-hash "Comments:") ; NOTE: hack around stupid compiler crasher bug
               (CommentList {:data this.state.data})
               (CommentInput {:callback (:comments-updated this)})
               )))


;; Finally, render the entire app. :)
(React.renderComponent
  (CommentBox)
  (document.getElementById "app-wisp"))
