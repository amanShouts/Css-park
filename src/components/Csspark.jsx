import { useRef, useState } from "react"
import css from "css"

export function Csspark() {
    const [text, , setText] = useState("") // irrelevant, maybe for later use 
    const [cssText, setCss] = useState("")
    const [divClass, setDivClass] = useState("")
    const [buttonClass, setButtonClass] = useState("")
    const [imageClass, setImageClass] = useState("")
    const [inputClass, setInputClass] = useState("")
    const [animate, setAnimate] = useState(false)



    const inputRef = useRef(null)
    const imgRef = useRef(null)
    const divRef = useRef(null)
    const buttonRef = useRef(null)

    function applyCss() {
        // we have all classes names in the input boxes 
        // and we have main css from textarea
        // console.log(divClass, buttonClass, imageClass, inputClass)
        // console.log("the actual css -> ", cssText)

        let obj = css.parse(cssText)

        let allCssObj = parseTheCss(obj)

        let elementClassArr = [divClass, buttonClass, imageClass, inputClass]
        let elementRefArr = [divRef, buttonRef, imgRef, inputRef]

        for (let i in elementClassArr) {
            let tempClass = elementClassArr[i]
            let tempRef = elementRefArr[i]

            if (tempClass != "" && allCssObj[tempClass] != undefined) {
                //apply css to div
                let allcss = addAnimationDelay() + " ;"
                for (let cssline of allCssObj[tempClass]) {
                    allcss += cssline + " "
                }

                // allcss += addAnimationDelay() + " ;"
                let div = tempRef.current
                // console.log("inside div- ", div, allcss)
                div.style = allcss
            }
        }
    }

    function addAnimationDelay() {
        let animationcss = "transition: all 2000ms ease-in-out "
        if (animate)
            return animationcss
        else
            return ""
    }

    function parseTheCss(obj) {
        let rules = obj.stylesheet.rules
        // console.log("rule", rules)
        let answerObj = {}

        for (let element of rules) {
            // console.log(element, " ele")
            let classnameArr = element.selectors
            // console.log(classnameArr)
            let classname = classnameArr[0].trim()
            let cssSyntax = element.declarations
            answerObj[classname] = []

            for (let syn of cssSyntax) {
                // console.log(syn, " --syn")
                let syntax = syn.property + ":" + syn.value + ";"
                answerObj[classname].push(syntax)
            }

        }
        // console.log(answerObj)
        return answerObj

    }

    function downloadCss() {
        const blob = new Blob([cssText], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'styles.css');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    function animateMyCss(e) {
        if (e.target.checked == true)
            setAnimate(prev => true)
        else
            setAnimate(prev => false)
    }

    function resetAll(event) {
        console.log(event.target.value)
        if (event.target.checked == true) {
            inputRef.current.style = ""
            imgRef.current.style = ""
            buttonRef.current.style = ""
            divRef.current.style = ""

            setTimeout(() => {
                event.target.checked = false;
            }, 1000);
        }

    }


    return (
        <div>
            <div className="flex bg-blue-100 h-[90vh] p-2">
                <div className="w-[53%] bg-white-600 h-5/6 px-10 py-5 border-dotted">
                    <textarea className="w-full h-96 resize-none p-2"
                        value={cssText}
                        onChange={(e) => setCss(e.target.value)}
                        placeholder="Write css here like you normally would :)">

                    </textarea>

                    <div className="flex p-2 w-full justify-evenly items-center mt-7">
                        <button className="w-1/4 bg-slate-600 h-10 text-white hover:bg-white hover:text-base hover:text-black hover:tracking-widest shadow-2xl transition-all duration-700 hover:shadow-inner"
                            onClick={applyCss}> Previews </button>
                        <button className="w-1/4 bg-slate-600 h-10 text-white hover:bg-white hover:text-base hover:text-black hover:tracking-widest shadow-2xl transition-all duration-700"
                            onClick={downloadCss}> Download CSS </button>
                        <div className="flex justify-around items-center w-36 p-1 ">
                            <div className="flex flex-col justify-evenly items-center h-[50px] " >
                                <input type="checkbox" name="Animation" value="animation" className="w-[20px] h-[20px]"
                                    onChange={(e) => { animateMyCss(e) }} />
                                <span className="text-sm hover:border-b-[1px] hover:border-solid hover:border-black hover:transition-all hover:duration-500"> animate</span>
                            </div>
                            <div className="flex flex-col justify-evenly h-[50px] items-center">
                                <input type="checkbox" name="Reset" value="reset" className="w-[20px] h-[20px]"
                                    onChange={(e) => { resetAll(e); }} />
                                <span className="text-sm hover:border-b-[1px] hover:border-solid hover:border-black hover:transition-all hover:duration-500"> reset </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[80vh] border-r-[1px] border-black border-solid "></div>

                <div className="flex flex-col justify-center h-[80vh] p-5  w-[50%] m-5">
                    <div className="flex flex-row justify-evenly items-center border-b-[1px] border-black border-solid py-3 -mt-10">
                        <div className="flex flex-col w-1/5 text-center text-sm">
                            <i>div</i>
                            <input className="w-full text-center italic" value={divClass} onChange={(e) => { setDivClass(e.target.value.trim()) }} placeholder="classname" />
                        </div>
                        <div className="w-1/5 text-center text-sm">
                            <i>button</i>
                            <input className="w-full text-center italic" value={buttonClass} onChange={(e) => { setButtonClass(e.target.value.trim()) }} placeholder="classname" />
                        </div>
                        <div className="w-1/5 text-center text-sm">
                            <i>image</i>
                            <input className="w-full text-center italic" value={imageClass} onChange={(e) => { setImageClass(e.target.value.trim()) }} placeholder="classname" />
                        </div>
                        <div className="w-1/5 text-center text-sm">
                            <i>input</i>
                            <input className="w-full text-center italic" value={inputClass} onChange={(e) => { setInputClass(e.target.value.trim()) }} placeholder="classname" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-around p-5 items-center h-[100%]  w-[100%]">
                        <div ref={divRef} className="flex justify-center items-center h-20 bg-slate-300 w-[40%] border-2 border-black border-solid rounded-md text-[0.8%] md:text-[1.5em]">
                            Im a DIV
                        </div>
                        <button ref={buttonRef} className="border-[1px] border-solid border-white p-2 w-[30%]">
                            Buttonman
                        </button>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzgzYZcyjitQILmGWjR_PJg6enFn-7mySPEvqTFAtzC-wUDm3QHl-aBEKa2QTD4E4g-Y&usqp=CAU" alt="demo picture"
                            ref={imgRef} />
                        <input value={text} onChange={(e) => { setText(e.target.value) }} placeholder="Enter here ... " ref={inputRef} className="h-[30px] text-center italic" />
                    </div>
                </div>
            </div >
        </div >
    )
}