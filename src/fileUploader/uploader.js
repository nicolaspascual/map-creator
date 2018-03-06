import '../../styles/uploader.css';
import swal from 'sweetalert2';
import Papa from 'papaparse';


export default class FileUploader {


    constructor(id, callback) {
        this.callback = callback;
        this.info = {};
        document.getElementById(id)
            .addEventListener('click', () => this.popup());
    }

    popup() {
        swal({
            title: 'Selecciona un archivo .csv',
            text: 'La primera columna tiene que ser la provincia y la segunda el texto a mostrar',
            input: 'file'
        }).then((value) => {
            let file = value.value;
            if (file) {
                var reader = new FileReader();
                reader.onload = (evt) => {
                    let data = Papa.parse(evt.target.result).data;
                    data.forEach((i) => this.info[i[0]] = i[1]);
                    localStorage.setItem(FileUploader.STORAGE_KEY, JSON.stringify(this.info));
                    this.callback(this.info);
                };
                reader.readAsText(file, "UTF-8");
            }
        });
    }
}

FileUploader.STORAGE_KEY = 'data';