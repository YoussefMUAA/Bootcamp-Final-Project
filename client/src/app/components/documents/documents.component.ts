import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Document } from 'src/app/interfaces/document.interface';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: Document[] = [];
  formDocument: FormGroup;
  files: any;

  constructor(private documentsService: DocumentsService) {
    this.formDocument = new FormGroup({
      doc_title: new FormControl('', [
        Validators.required
      ]),
      is_private: new FormControl('0', []),
      doc_description: new FormControl('', [
        Validators.maxLength(250)
      ]),
      doc_url: new FormControl('', [])
    })
  }

  filterDocuments = '';

  async ngOnInit(): Promise<void> {
    this.documents = await this.documentsService.getAll();

  }

  registerDocument() {
    // Objeto donde incluimos el documento
    let fd = new FormData();
    fd.append('doc_title', this.formDocument.value.doc_title);
    fd.append('is_private', this.formDocument.value.is_private);
    fd.append('doc_description', this.formDocument.value.doc_description);
    fd.append('doc_url', this.files[0]);

    // registro
    this.documentsService.createDocument(fd).subscribe(response => {
      if (response.id_document) {
        alert('Document uploaded successfully')
        this.formDocument.reset()
        this.documentsService.getAll()
        .then(documents => this.documents = documents)
        .catch (error => console.log(error));
      } else {
        alert('Document upload failed')
      }
    })
  }

  // Documents event
  onChange($event: any) {
    this.files = $event.target.files;
  }

    //* Validators
  // Required
  checkControl(controlName: string, errorName: string) {
    if (this.formDocument.get(controlName)?.hasError(errorName) && this.formDocument.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  // Refresh
  async onRefreshDocuments() {
    this.documents = await this.documentsService.getAll();
  }
}
