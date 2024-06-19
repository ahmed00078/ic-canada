import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameService } from '../services/frame.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { WebsiteService } from '../services/website.service';
import { FrameElemntService } from '../services/frame-elemnt.service';

declare function draggableElement(id: any): void

@Component({
  selector: 'app-making-app',
  templateUrl: './making-app.component.html',
  styleUrls: ['./making-app.component.css']
})
export class MakingAppComponent implements OnInit {

  colors = [
    "#ff0000",  // Red
    "#00ff00",  // Green
    "#0000ff",  // Blue
    "#ffff00",  // Yellow
    "#ff00ff",  // Magenta
    "#00ffff",  // Cyan
    "#800080",  // Purple
    "#008000",  // Dark Green
    "#800000",  // Maroon
    "#008080",  // Teal
    "#ff4500",  // Orange Red
    "#ff8c00",  // Dark Orange
    "#ff69b4",  // Hot Pink
    "#483d8b",  // Dark Slate Blue
    "#800000",   // Dark Red,
   
  ]

  openBgPicker = false
  openTextPicker = false
  idActiveframe: any
  openSideBar = false
  numbersArray: any = []
  element: any
  element1: any
  element2: any
  websiteName = ''
  openSettings = false
  contentFrame = ''
  activeElement = ""
  titleFrame = ""
  textInputSettingsValue = ""
  sizeInputSettingsValue = "1"
  contentHtml: any
  colorInputSettingsValue = "rgb(255, 0, 72)"
  backgroundColorInputSettingsValue = "rgb(255, 0, 72)"
  openStyleSection = false
  openStyleText = false
  textCodeValue = ''
  openTextCode = false
  openFormFrameEdit = false
  openFramesListe = false
  framesList: any = []
  activeframe: any
  idActiveElement: any
  frameDetails = new FormGroup({
    title: new FormControl('', [Validators.required]),
    route: new FormControl('', [Validators.required])
  })
  elements: any = []
  textCodeEvent = ""
  frameContent = ""
  isButtonActive = false
  openTextCodeButton = false
  isButtonNavBar = false
  openNavbarElement = false
  openText = false
  openAddBtnNav = false
  routeBtn = "--- select route"
  openTableSetts = false
  rowsFormData: any = []
  openFormrow = false
  openFormcol = false
  openControlsTable = false
  columnToUpdate: any
  openFormrowUpdate = false
  controlElement: any

  constructor(private frameservice: FrameService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private websiteservice: WebsiteService, private elementservice: FrameElemntService) { }


  ngOnInit(): void {
    this.TS_FillFrameContent()
    for (let i = 1; i <= 100; i++) {
      this.numbersArray.push(i.toString());
    }
    this.TS_GetFrames()
    this.TS_SetStylePositionElement()
  }

  TS_FillFrameContent() {
    this.element = document.querySelector(".frame")
    for (let i = 0; i < this.framesList.length; i++) {
      if (this.framesList[i].key === this.activeframe) {
        this.framesList[i].content = this.element.innerHTML
      }
    }
    setTimeout(this.TS_FillFrameContent.bind(this), 50)
  }

  TS_GetFrames() {
    this.framesList = []
    this.websiteservice.getById(this.route.snapshot.params['id']).subscribe({
      next: (res: any) => {
        this.websiteName = res.title
        this.frameservice.getAll().subscribe({

          next: (r: any) => {

             this.contentHtml=this.sanitizer.bypassSecurityTrustHtml( res.content);
            for (let i = 0; i < r.length; i++) {
              console.log(r[i].webSiteId, this.route.snapshot.params['id'])

              if (r[i].webSiteId == this.route.snapshot.params['id']) {
                this.framesList.push(r[i])
              }

            }
            console.log(this.framesList)
          }
        })
      }
    })


  }

  TS_SetStylePositionElement() {
    this.element = document.querySelector(".frame")
    if (this.element.childNodes) {
      for (let i = 0; i < this.element.childNodes.length; i++) {
        if (this.element.childNodes[i].style.left.includes("px")) {
          this.element.childNodes[i].style.left = (parseInt(this.element.childNodes[i].style.left.replace("px", "")) / this.element.offsetWidth) * 100 + "%"
        }
        if (this.element.childNodes[i].style.top.includes("px")) {
          this.element.childNodes[i].style.top = (parseInt(this.element.childNodes[i].style.top.replace("px", "")) / this.element.offsetHeight) * 100 + "%"
        }
        if (this.element.childNodes[i].style.width.includes("px")) {
          this.element.childNodes[i].style.width = (parseInt(this.element.childNodes[i].style.width.replace("px", "")) / this.element.offsetWidth) * 100 + "%"
        }
        if (this.element.childNodes[i].style.height.includes("px")) {
          this.element.childNodes[i].style.height = (parseInt(this.element.childNodes[i].style.height.replace("px", "")) / this.element.offsetHeight) * 100 + "%"
        }
      }
    }
    setTimeout(this.TS_SetStylePositionElement.bind(this), 500);
  }

  TS_AddTextToFrame(frame: any) {
    const text = document.createElement("p")
    text.innerText = "Title"
    text.setAttribute("style", `position:absolute;
      position:absolute;
      font-size:2vw;
      cursor: pointer;
      padding:1%;
      border:.1vw solid transparent;
      color:black;
      width:90px;
      height:10px; `)
    text.setAttribute("class", "text")
    text.id = this.TS_GenerateCode(4)
    text.addEventListener("click", () => {
      this.openText = true
      this.openNavbarElement = false
      this.isButtonNavBar = false
      this.isButtonActive = false
      this.openFramesListe = false
      this.openSettings = true
      this.sizeInputSettingsValue = (parseInt(text.style.fontSize.replace("vw", "")) * 10) + ""
      this.textInputSettingsValue = text.innerText
      this.colorInputSettingsValue = text.style.color
      this.activeElement = text.id
      this.TS_DesactiveElements()
      text.style.borderColor = "rgb(255, 0, 72)"
      draggableElement(text.id)
      this.openControlsTable = false
    })
    frame.appendChild(text)
    this.TS_SaveElement(text.id, 'text')
  }
  TS_GenerateCode(length: any) {
    const numbers = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPMLKJHGFDQSWXCVBN'
    var result = ''
    for (var i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * numbers.length)
      result += numbers.charAt(index)
    }
    return result
  }
  TS_DesactiveElements() {
    this.element = document.querySelector(".frame")
    if (this.element.childNodes) {
      for (let i = 0; i < this.element.childNodes.length; i++) {
        this.element.childNodes[i].style.borderColor = "transparent"
      }
    }
  }

  TS_SaveElement(key: any, type: any) {
    var trouve = false
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].key === key) {
        trouve = true
      }
    }
    if (!trouve) {
      this.elementservice.create({
        key: key,
        type: type,
        frameId: this.idActiveframe,
      }).subscribe({
        next: (res: any) => {
          console.log(res)
        }
      })
    }
  }

  TS_ReadImage(e: any) {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = (event: any) => {
      const imageDataUrl = event.target.result;
      this.TS_AddImageToFrame(imageDataUrl)
    };
    fileReader.readAsDataURL(file);
  }
  TS_AddImageToFrame(src: any) {
    this.element = document.querySelector(".frame")
    const img = document.createElement("img")
    const container = document.createElement("div")
    img.src = src
    img.setAttribute("style", `
      width:100%;
      height:100%;
      object-fit: cover;
    `)
    container.setAttribute("style", `
      position:absolute;
      width:120px;
      height:100px;
    `)
    img.setAttribute("class", "img")
    container.id = this.TS_GenerateCode(4)
    img.addEventListener("click", () => {
      this.openText = false
      this.openNavbarElement = false
      this.isButtonNavBar = false
      this.isButtonActive = false
      this.openFramesListe = false
      this.openSettings = false
      this.activeElement = container.id
      this.TS_DesactiveElements()
      draggableElement(container.id)
      this.openControlsTable = false
    })
    container.appendChild(img)
    this.element.appendChild(container)
    this.TS_SaveElement(container.id, 'image')
  }
  TS_UpdateFrame(frame: any) {
    const request = {
      content: frame.content,
    }
    this.frameservice.update(frame.id, request).subscribe({
      next: (res: any) => {
      }
    })
  }

  TS_AddNavBarHorizToFrame(frame: any) {
    const section = document.createElement("div")
    section.setAttribute("style", `
      width: 900px;
      height: 10px;
      padding: 1.5%;
      background-color: black;
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
    `)
    section.id = this.TS_GenerateCode(4)
    section.setAttribute("class", "section")
    section.addEventListener("click", (e: any) => {
      if (e.target.id === section.id) {
        this.openAddBtnNav = true
        this.openText = false
        this.openNavbarElement = true
        this.isButtonNavBar = false
        this.isButtonActive = false
        this.openSettings = true
        this.openStyleSection = true
        this.openStyleText = false
        this.activeElement = section.id
        this.backgroundColorInputSettingsValue = section.style.backgroundColor
        this.TS_DesactiveElements()
        section.style.borderColor = "rgb(255, 0, 72)"
        draggableElement(section.id)
        this.openControlsTable = false
      }
    })
    frame.appendChild(section)
    this.TS_SaveElement(section.id, 'section')
  }

  TS_AddTableToFrame(frame: any) {
    const container = document.createElement("div")
    const table = document.createElement("table")
    const thead = document.createElement("thead")
    const cols = document.createElement("tr")
    const tbody = document.createElement("tbody")
    const addRowsBtn = document.createElement("button")
    const addColsBtn = document.createElement("button")
    const importXLBtn = document.createElement("button")
    const exportXLBtn = document.createElement("button")
    addRowsBtn.setAttribute("class", "btn btn-primary btnaddtableevent")
    addColsBtn.setAttribute("class", "btn btn-primary btnaddtableevent")
    importXLBtn.setAttribute("class", "btn btn-success btnaddtableevent btnexcel importXl")
    exportXLBtn.setAttribute("class", "btn btn-success btnaddtableevent btnexcel exportXl")
    addRowsBtn.innerText = "Ajouter ligne"
    addColsBtn.innerText = "Ajouter colone"
    exportXLBtn.innerText = "Export to excel"
    importXLBtn.innerText = "Import excel"
    container.id = this.TS_GenerateCode(4)
    addRowsBtn.id = "addrowbtn-" + container.id
    addColsBtn.id = "addcolbtn-" + container.id
    container.setAttribute("style", `
      position: absolute;
      width: 700px;
      over
      top: 30px;
      left: 40px;
      user-select: none;
      background-color: #f8f9fa;
    `)
    table.setAttribute("class", "table table-light")
    cols.id = container.id + "-cols"
    cols.setAttribute("style", "text-align:center")
    cols.innerHTML = `<th scope="col"></th>`
    tbody.id = container.id + "-rows"
    tbody.setAttribute("style", "text-align:center")
    thead.appendChild(cols)
    table.appendChild(thead)
    table.appendChild(tbody)
    addRowsBtn.addEventListener("click", () => {
      this.TS_initTableRows()
      this.openFormrow = true
    })
    addColsBtn.addEventListener("click", () => {
      this.openFormcol = true
    })
    container.appendChild(addColsBtn)
    container.appendChild(addRowsBtn)
    container.appendChild(exportXLBtn)
    container.appendChild(importXLBtn)
    table.id = this.TS_GenerateCode(5)
    exportXLBtn.id = table.id + "-export"
    importXLBtn.id = table.id + "-import"
    exportXLBtn.addEventListener("click", () => {
      this.controlElement = exportXLBtn
    })
    importXLBtn.addEventListener("click", () => {
      this.controlElement = importXLBtn
    })
    container.appendChild(table)
    container.addEventListener("click", () => {
      this.openText = false
      this.openNavbarElement = false
      this.isButtonNavBar = false
      this.isButtonActive = false
      this.openFramesListe = false
      this.openSettings = true
      this.openTableSetts = true
      this.activeElement = container.id
      this.TS_DesactiveElements()
      draggableElement(container.id)
      this.openControlsTable = true
    })
    frame.appendChild(container)
  }
  TS_initTableRows() {
    this.rowsFormData = []
    this.element = document.querySelector("#" + this.activeElement + "-cols")
    for (let i = 0; i < this.element.childNodes.length; i++) {
      if (this.element.childNodes[i].innerText !== "") {
        this.rowsFormData.push({
          title: this.element.childNodes[i].innerText,
          value: ""
        })
      }
    }
    console.log(this.rowsFormData)
  }

  TS_SaveWebsite() {
    this.element = document.querySelector(".frame")
    if (this.element.childNodes) {
      for (let i = 0; i < this.element.childNodes.length; i++) {
        this.element.childNodes[i].style.cursor = "default"
      }
    }
    const request = {
      title: this.websiteName
    }
    this.websiteservice.update(this.route.snapshot.params['id'], request).subscribe({
      next: (res: any) => {
        alert('saved successfully')
        for (let i = 0; i < this.framesList.length; i++) {
          this.TS_UpdateFrame(this.framesList[i])
        }
      }
    })
  }


  TS_AddFrame() {
    const request = {
      webSiteId: this.route.snapshot.params['id'],
      key: this.TS_GenerateCode(5),
      title: 'new frame',
      event: '',
      content: '',
      route: '',
    }
    this.frameservice.create(request).subscribe({
      next: (res: any) => {
        this.TS_GetFrames()
      }
    })
  }

  TS_SelectFrame(frame: any) {
    this.activeframe = frame.key
    this.frameDetails.setValue({
      title: frame.title,
      route: frame.route,
    })
    this.textCodeValue = frame.event
    this.element = document.querySelector(".frame")
    this.element.innerHTML = frame.content
    setTimeout(() => {
      this.elementservice.getByFrame(frame.id).subscribe({
        next: (res: any) => {
          this.elements = res
          for (let i = 0; i < this.elements.length; i++) {
            this.element = document.querySelector("#" + this.elements[i].key)
            this.element.addEventListener("click", (e: any) => {
              if (this.elements[i].type === "text") {
                this.openText = true
                this.openNavbarElement = false
                this.isButtonNavBar = false
                this.isButtonActive = false
                this.openFramesListe = false
                this.openSettings = true
                this.sizeInputSettingsValue = (parseInt(this.element.style.fontSize.replace("vw", "")) * 10) + ""
                this.textInputSettingsValue = this.element.innerText
                this.colorInputSettingsValue = this.element.style.color
                this.activeElement = this.elements[i].key
                this.TS_DesactiveElements()
                draggableElement(this.elements[i].key)
                this.openControlsTable = false
              }
              else if (this.elements[i].type === "button") {
                this.element = document.querySelector("#" + this.elements[i].key)
                this.openAddBtnNav = false
                this.openText = true
                this.isButtonNavBar = true
                this.isButtonActive = true
                this.openSettings = true
                this.openStyleSection = true
                this.openStyleText = true
                this.backgroundColorInputSettingsValue = this.element.style.backgroundColor
                this.routeBtn = this.element.getAttribute("navid") + ""
                this.colorInputSettingsValue = this.element.style.color
                console.log(this.element.innerText)
                this.textInputSettingsValue = this.element.innerText
                this.activeElement = this.elements[i].key
                this.TS_DesactiveElements()
                this.openControlsTable = false
              }
              else if (this.elements[i].type === "section") {
                if (e.target.id === this.elements[i].key) {
                  this.openAddBtnNav = true
                  this.openText = false
                  this.openNavbarElement = true
                  this.isButtonNavBar = false
                  this.isButtonActive = false
                  this.openSettings = true
                  this.openStyleSection = true
                  this.openStyleText = false
                  this.activeElement = this.elements[i].key
                  this.backgroundColorInputSettingsValue = this.element.style.backgroundColor
                  this.TS_DesactiveElements()
                  this.element.style.borderColor = "rgb(255, 0, 72)"
                  draggableElement(this.elements[i].key)
                  this.openControlsTable = false
                }
              } else if (this.elements[i].type === "image") {
                this.openAddBtnNav = false
                this.openText = false
                this.openNavbarElement = false
                this.isButtonNavBar = false
                this.isButtonActive = false
                this.openSettings = true
                this.openStyleSection = false
                this.openStyleText = false
                this.activeElement = this.elements[i].key
                this.TS_DesactiveElements()
                draggableElement(this.elements[i].key)
                this.openControlsTable = false
              }
            })
          }

        }
      })
    }, 700);
  }

  TS_SetBtnRouteToFrame(route: any) {
    this.element = document.querySelector("#" + this.activeElement)
    console.log(this.element)
    this.element.setAttribute("class", "nav-bar-btn")
    this.element.setAttribute("navid", route.target.value)
    this.routeBtn = "--- select route"
  }

  TS_AddNavBarHorizBtns() {
    const button = document.createElement("div")
    this.openFramesListe = false
    button.setAttribute("style", `
      width: 100px;
      height: 0px;
      padding: 1.5% 0;
      background-color: #0e8ce0;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.4vw;
      cursor: pointer;
      margin: 0 2%;
    `)
    button.setAttribute("class", "button")
    button.innerText = "click"
    button.id = this.TS_GenerateCode(4)
    button.setAttribute("navid", "--- select route")
    button.addEventListener("click", () => {
      this.openAddBtnNav = false
      this.openText = true
      this.isButtonNavBar = true
      this.isButtonActive = true
      this.openSettings = true
      this.openStyleSection = true
      this.openStyleText = true
      this.backgroundColorInputSettingsValue = button.style.backgroundColor
      this.colorInputSettingsValue = button.style.color
      this.textInputSettingsValue = button.innerText
      this.routeBtn = button.getAttribute("navid") + ""
      this.activeElement = button.id
      this.TS_DesactiveElements()
      this.openControlsTable = false
      button.style.borderColor = "rgb(255, 0, 72)"
    })
    this.element = document.querySelector("#" + this.activeElement)
    this.element.appendChild(button)
    this.TS_SaveElement(button.id, 'button')
  }

  // all elements style changes
  TS_SetTextToElement(text: any) {
    console.log(this.activeElement)
    this.element = document.querySelector("#" + this.activeElement)

    this.element.innerText = text.target.value

  }

  TS_ChangeBackgroundColor(color: any, picker: any) {
    picker.style.backgroundColor = color
    console.log(picker)
    this.element = document.querySelector("#" + this.activeElement)
    this.element.style.backgroundColor = color
  }

  TS_ChangeTextColor(color: any, picker: any) {

    picker.style.backgroundColor = color
    this.element = document.querySelector("#" + this.activeElement)

    this.element.style.color = color

  }

  TS_SetTableControlsDisplay(id: any) {
    var btn: any = document.querySelector("#" + id + "-" + this.activeElement)
    if (btn!==null) {
      if (btn.style.opacity === "1" || btn.style.opacity === "") {
        btn.style.opacity = "0"
        btn.style.pointerEvents = "none"
      } else {
        btn.style.opacity = "1"
        btn.style.pointerEvents = "all"
      }
    }else {
      console.log("button ==> ", id)
      btn = document.querySelectorAll("." + id)
      for (let i = 0; i < btn.length; i++) {
        if (btn[i].style.opacity === "1" || btn[i].style.opacity === "") {
          btn[i].style.opacity = "0"
          btn[i].style.pointerEvents = "none"
        } else {
          btn[i].style.opacity = "1"
          btn[i].style.pointerEvents = "all"
        }
      }
    }
  }

  TS_RemoveElement() {
    this.element = document.querySelector("#" + this.activeElement)
    this.elementservice.getByFrame(this.idActiveframe).subscribe({
      next: (res: any) => {
        this.elements = res
        for (let i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key === this.activeElement) {
            console.log(this.elements[i])
            this.elementservice.delete(this.elements[i].id).subscribe({
              next: (res: any) => {
                console.log(res)
                this.element = document.querySelector("#" + this.elements[i].key)
                this.element.style.display = "none"
              }
            })
          }
        }
      }
    })
  }


/*    */
  
  TS_SaveFrameDetails() {
    const request = {

      title: this.frameDetails.value.title,
      route: this.frameDetails.value.route,
    }

    this.frameservice.update(this.idActiveframe, request).subscribe({
      next: (res: any) => {
        console.log(res)
        this.TS_GetFrames()
        alert('frame updated')
      }
    })

  }
  TS_DeleteFrame() {
    this.frameservice.delete(this.idActiveframe).subscribe({
      next: (res: any) => {
        this.element = document.querySelector(".frame")
        this.element.innerHTML = ""
        console.log(res)
        alert('fram deleted')
        this.openFormFrameEdit = false
        this.TS_GetFrames()
      }
    })


  }

/*    */

TS_ChangeRowValue(e: any, title: any) {
  console.log(this.rowsFormData)
  for (let i = 0; i < this.rowsFormData.length; i++) {
    if (this.rowsFormData[i].title === title) {
      this.rowsFormData[i].value = e.target.value

    }

  }
}

TS_AddRowTotable() {
  this.element = document.querySelector("#" + this.activeElement + "-rows")
  const tr = document.createElement("tr")
  const upadteBtn = document.createElement("button")
  const deleteBtn = document.createElement("button")
  const tdBtn = document.createElement("td")
  upadteBtn.setAttribute("class", "btn btn-primary btnaddtableevent btntableeventcontrol updateRow")
  deleteBtn.setAttribute("class", "btn btn-danger bleevent btntableeventcontrol deleteRow")
  upadteBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`
  deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`
  tdBtn.appendChild(upadteBtn)
  tdBtn.appendChild(deleteBtn)
  tr.appendChild(tdBtn)
  for (let i = 0; i < this.rowsFormData.length; i++) {
    if (this.rowsFormData[i].title !== "") {
      const td = document.createElement("td")
      td.innerText = this.rowsFormData[i].value
      tr.appendChild(td)
    }
  }
  upadteBtn.addEventListener("click", () => {
    this.TS_GetRowToUpdate(tr)
    this.controlElement = upadteBtn
  })
  deleteBtn.addEventListener("click", () => {
    this.controlElement = deleteBtn
    tr.remove()
  })
  this.element.appendChild(tr)
}
TS_GetRowToUpdate(row: any) {
  this.TS_initTableRows()
  this.columnToUpdate = row
  for (let i = 1; i < row.childNodes.length; i++) {
    this.rowsFormData[i - 1].value = row.childNodes[i].innerText
  }
  this.openFormrowUpdate = true
}

TS_UpdateColumn() {
  const tr = this.columnToUpdate
  tr.innerHTML = ""
  const upadteBtn = document.createElement("button")
  const tdBtn = document.createElement("td")
  const deleteBtn = document.createElement("button")
  upadteBtn.setAttribute("class", "btn btn-primary btnaddtableevent btntableeventcontrol updateRow")
  deleteBtn.setAttribute("class", "btn btn-danger bleevent btntableeventcontrol deleteRow")
  upadteBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`
  deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`
  tdBtn.appendChild(upadteBtn)
  tdBtn.appendChild(deleteBtn)
  tr.appendChild(tdBtn)
  for (let i = 0; i < this.rowsFormData.length; i++) {
    if (this.rowsFormData[i].title !== "") {
      const td = document.createElement("td")
      td.innerText = this.rowsFormData[i].value
      tr.appendChild(td)
    }
  }
  upadteBtn.addEventListener("click", () => {
    this.controlElement = upadteBtn
    this.TS_GetRowToUpdate(tr)
  })
  deleteBtn.addEventListener("click", () => {
    this.controlElement = deleteBtn
    tr.remove()
  })
}

TS_AddColToTable(e: any) {
  this.element = document.querySelector("#" + this.activeElement + "-cols")
  this.element.innerHTML += `<th scope="col">${e}</th>`
}

/*    A supprimer */



  TS_setFontSize(size: any) {
    this.element = document.querySelector("#" + this.activeElement)
    this.element.style.fontSize = (parseInt(size.target.value) / 10) + "vw"
  }

  TS_addColumnToTable(title: any) {
    this.element = document.querySelector("#" + this.activeElement + "-cols")
    this.element.innerHTML += `<th scope="col">${title}</th>`
  }

 




}
