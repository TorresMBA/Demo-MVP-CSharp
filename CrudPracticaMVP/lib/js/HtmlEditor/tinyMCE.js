user_language = "es";

	function tiny(modeButtons, elementos,CustomSaveContent,functionClick, functionChange, functionLoad, functionKeyUp, extended_elements){
		switch (modeButtons) {
    case 0:
        tinyMCE.init({
            // General options
            onClick_callback: functionClick,
            onchange_callback: functionChange,
            onload_callback: functionLoad,
            onkeyup_callback: functionKeyUp,
            save_callback: CustomSaveContent,

            mode: modeTinyMCE,
            language: user_language,
            elements: elementos,
            editor_deselector: /(NoEditor|NoRichText)/,
            theme: "advanced",
            plugins: "imagemanager,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            extended_valid_elements: extended_elements,

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,sub,sup,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
            theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
            theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,insertimage",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: false, //No se puede redimensionar el editor

            //Utiliza retorno <br> de carro en vez de párrafos <p>
            force_br_newlines: true,
            force_p_newlines: false,

            // Example content CSS (should be your site CSS)
            content_css: "./lib/js/HtmlEditor/css/content.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "lists/template_list.js",
            external_link_list_url: "lists/link_list.js",
            external_image_list_url: "lists/image_list.js",
            media_external_list_url: "lists/media_list.js"

        }); break;

    case 1:
        tinyMCE.init({
            // General options
          
            onClick_callback: functionClick,
            onchange_callback: functionChange,
            onload_callback: functionLoad,
            onkeyup_callback: functionKeyUp,

            save_callback: CustomSaveContent,

            mode: modeTinyMCE,
            language: user_language,
            elements: elementos,
            editor_deselector: "myTextEditor",
            theme: "advanced",
            plugins: "imagemanager,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            extended_valid_elements: extended_elements,

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,sub,sup,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2: "",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: false, //No se puede redimensionar el editor

            //Utiliza retorno <br> de carro en vez de párrafos <p>
            force_br_newlines: true,
            force_p_newlines: false,

            // Example content CSS (should be your site CSS)
            content_css: "../../../lib/tinyMCE/jscripts/css/content.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "../../../lib/tinyMCE/jscripts/lists/template_list.js",
            external_link_list_url: "../../../lib/tinyMCE/jscripts/lists/link_list.js",
            external_image_list_url: "../../../lib/tinyMCE/jscripts/lists/image_list.js",
            media_external_list_url: "../../../lib/tinyMCE/jscripts/lists/media_list.js"

        }); break;
    case 2:
        tinyMCE.init({
            // General options
          
            onClick_callback: functionClick,
            onchange_callback: functionChange,
            onload_callback: functionLoad,
            onkeyup_callback: functionKeyUp,

            save_callback: CustomSaveContent,

            mode: modeTinyMCE,
            language: user_language,
            //elements: elementos,
            editor_selector: elementos,
            editor_deselector: /(NoEditor|NoRichText)/,
            theme: "advanced",
            plugins: "imagemanager,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            extended_valid_elements: extended_elements,

            // Theme options
            theme_advanced_buttons1: "sub,sup,|,insertimage",
            theme_advanced_buttons2: "",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "none",
            theme_advanced_resizing: false, //No se puede redimensionar el editor

            //Utiliza retorno <br> de carro en vez de párrafos <p>
            force_br_newlines: true,
            force_p_newlines: false,

            // Example content CSS (should be your site CSS)
            content_css: "css/content.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "lists/template_list.js",
            external_link_list_url: "lists/link_list.js",
            external_image_list_url: "lists/image_list.js",
            media_external_list_url: "lists/media_list.js"

        }); break;
    case 3:
        tinyMCE.init({
            // General options
            onClick_callback: functionClick,
            onchange_callback: functionChange,
            onload_callback: functionLoad,
            onkeyup_callback: functionKeyUp,
           
            save_callback: CustomSaveContent,

            mode: modeTinyMCE,
            language: user_language,
            editor_selector: elementos,
            editor_deselector: /(NoEditor|NoRichText)/,
            theme: "advanced",
            plugins: "imagemanager,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            extended_valid_elements: extended_elements,

            // Theme options
            theme_advanced_buttons1: "sub,sup,",
            theme_advanced_buttons2: "",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "none",
            theme_advanced_resizing: false, //No se puede redimensionar el editor

            //Utiliza retorno <br> de carro en vez de párrafos <p>
            force_br_newlines: true,
            force_p_newlines: false,

            // Example content CSS (should be your site CSS)
            content_css: "css/content.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "lists/template_list.js",
            external_link_list_url: "lists/link_list.js",
            external_image_list_url: "lists/image_list.js",
            media_external_list_url: "lists/media_list.js"

        }); break;
        // This option initialize the editor expanding his size to the window. - centros_ktt
    case 4:
        tinyMCE.init({
            // General options
            relative_urls: false,
            remove_script_host: false,
            document_base_url: document.location.protocol + "//" + document.domain + "/",


            onClick_callback: functionClick,
            onchange_callback: functionChange,
            onload_callback: functionLoad,
            onkeyup_callback: functionKeyUp,
            nowrap: false,

            save_callback: CustomSaveContent,

            mode: modeTinyMCE,
            language: user_language,
            elements: elementos,
            editor_deselector: /(NoEditor|NoRichText)/,
            theme: "advanced",
            plugins: "autoresize,imagemanager,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            extended_valid_elements: extended_elements,

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,sub,sup,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
            theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
            theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,insertimage",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: false, //No se puede redimensionar el editor

            //Utiliza retorno <br> de carro en vez de párrafos <p>
            force_br_newlines: true,
            force_p_newlines: false,

            // Example content CSS (should be your site CSS)
            content_css: "css/content.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "lists/template_list.js",
            external_link_list_url: "lists/link_list.js",
            external_image_list_url: "lists/image_list.js",
            media_external_list_url: "lists/media_list.js",
            //invalid_elements: "head[title]",
            valid_children: "+body[style],+body[*]",

            // Custom formats.
            style_formats: [
                { title: 'Condiciones legales', block: 'p', styles: { margin: '5px 0', padding: '0', font: '1em/0.7em "Ubuntu", Arial, Helvetica, sans-serif', color: '#999' } }
            ]

        }); break;
    default:
}
	}




