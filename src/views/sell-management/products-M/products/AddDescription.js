import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AddDescription(html) {
  const [isDescription, setIsDescription] = useState(false);
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],     
      [{ 'indent': '-1'}, { 'indent': '+1' }],          
      [{ 'direction': 'rtl' }],                        
    
    
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
    
      ['clean']    
    ],
  };

  

  return (
    <Col>
      <Link to="#" onClick={() => setIsDescription(!isDescription)}>
        {isDescription ? 'Ẩn mô tả sản phẩm' : 'Thêm mô tả sản phẩm'}
      </Link>
      {isDescription ? <ReactQuill style={{marginTop: 20}} theme="snow" modules={modules}  value={value} onChange={setValue} /> : null}
    </Col>
  );
}
