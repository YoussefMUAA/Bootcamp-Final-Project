import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Document } from 'src/app/interfaces/document.interface';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css']
})
export class DocumentCardComponent implements OnInit {

  @Output() refreshDocuments: EventEmitter<boolean>
  @Input() myDocuments: Document | any;
  formEditDocument: FormGroup;
  urlDocument: string | any; 
  files: any;

  constructor(private documentsService: DocumentsService) {
    this.urlDocument = 'http://localhost:3000/documents/';
    
    this.refreshDocuments = new EventEmitter();
    
    this.formEditDocument = new FormGroup({
      doc_title: new FormControl('', [
        Validators.required
      ]),
      is_private: new FormControl('0', []),
      doc_description: new FormControl('', []),
      doc_url: new FormControl('', [])
    })
  }

  async ngOnInit() {

    let id = this.myDocuments.id_document
    const updateDocument = await this.documentsService.getById(id)
    this.formEditDocument = new FormGroup({
      doc_title: new FormControl(updateDocument?.doc_title, []),
      is_private: new FormControl(updateDocument?.is_private, []),
      doc_description: new FormControl(updateDocument?.doc_description, [])
    })
    
  }

  // edit document
  async editDocument(pId: number) {
    let fd = new FormData();
    fd.append('doc_title', this.formEditDocument.value.doc_title);
    fd.append('is_private', this.formEditDocument.value.is_private);
    fd.append('doc_description', this.formEditDocument.value.doc_description);
    if (this.files !== undefined) {
      fd.append('doc_url', this.files[0]);
      await this.documentsService.editDocument(fd, pId)
    }
    else {
      await this.documentsService.editDocumentData(this.formEditDocument.value, pId)
    }
    
    this.refreshDocuments.emit(true);
  }

    // Documents event
  onChange($event: any) {
    this.files = $event.target.files;
  }

  // delete document
  async deleteDocument(pId: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      const response = await this.documentsService.deleteDocument(pId)
      this.refreshDocuments.emit(true);
    } 
  }

}
