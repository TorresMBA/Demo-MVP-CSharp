</script>
<script type="text/javascript" language="javascript">
  var repId = "";
  var footId = "";
  var doresize = "0";

  function resizeReport(footerId, reportId) {

  doresize='1';
  document.getElementById(reportId).style.height = (jQuery(document).height() - jQuery('#' + footerId).height() - 40) + 'px';
  repId = reportId;
  footId = footerId;

  }
  function OnResizeReport() {
  resizeReport(footId, repId);
  }



  jQuery(window).resize(function () {
  if (doresize == "1") {
  resizeReport(footId, repId);
  }
  });

</script>

