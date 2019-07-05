// JavaScript Document
$(document).ready(function() 
{
  var x = "x"
  var o = "o"
  var count = 0;
  var o_win = 0;
  var x_win = 0;
  var count_x = 0;
  var count_o = 0;  
  var scale =  $("#inputScale").val();

  $("#reset").click(function () 
  {
    $("#game li").text("+");
    $("#game li").removeClass('disable o x btn-primary btn-info');
    count = 0;
    $("#lblPlayer").text('Player O turn').css('color','red');
  });

  $('#game').on('click', '.btnBlock', function() 
  {        
    if (count + 1 == (parseInt(scale) * parseInt(scale)))
    {
      alert('Its a tie. It will restart.')
      $("#reset").click();
    }
    else if ($(this).hasClass('disable'))
    {
      alert('Already selected')
    }
    else if (count%2 == 0)
    {
      count++;
      $(this).text(o);
      $(this).addClass('disable o btn-primary');
      $("#lblPlayer").text('Player X turn').css('color','green');
    }
    else  
    {
      count++;
      $(this).text(x);
      $(this).addClass('disable x btn-info');
      $("#lblPlayer").text('Player O turn').css('color','red');

    }

    //Check Horizontal Winner
    //looping to check each li class
    $("#game").find('tr').each (function() 
    {
      count_x = $(this).find('td li.x').length;
      count_o = $(this).find('td li.o').length;

      //if already have winner direcly stop the looping
      if (checkWinner(count_x, count_o))
      {
        return false;
      }

    }); 

    //Check Vertical Winner
    //looping each game column 
    var i = 1;
    while (i <= scale) 
    {
      count_x = $(".colTD"+i).find('li.x').length;
      count_o = $(".colTD"+i).find('li.o').length;
      i++;
      //if already have winner direcly stop the looping
      if (checkWinner(count_x, count_o))
      {
        return false;
      }
    }

    //Check Diagonal Winner
    //looping from top left to bottom right
    //looping from top right to bottom left
    var i = 1;
    var j = 1;
    var check;

    while (i <= 2)
    {
      count_x = 0;
      count_o = 0;
      j = 1;

      //if i = 1 then check from top left to bottom right
      //if i = 2 then check from top right to bottom left
      check = (i === 1) ? 1 :scale;

      while (j <= scale)
      {
        if ($("#"+check).hasClass('o') == true)
        {
          count_o++;
        }
        else if ($("#"+check).hasClass('x') == true)
        {
          count_x++;
        }
        check = (i === 1) ? parseInt(check) + parseInt(scale) + 1 : parseInt(check) + parseInt(scale) - 1;         
        j++;
      }

      //if already have winner direcly stop the looping
      if (checkWinner(count_x, count_o))
      {
        return false;
      }
      i++;
    }

  });

  function checkWinner(countX,CountO)
  {
    if (CountO == scale)
    {

      setTimeout(function() 
      {
        alert('Player O has won the game. Start a new game')
        count = 0;
        o_win++;
        $('#o_win').text(o_win);
        $("#reset").click();
        return true;
      }, 100);

    }
    else if (countX == scale)
    {
      setTimeout(function() 
      {
        alert('Player X has won the game. Start a new game')
        count = 0;
        x_win++;
        $('#x_win').text(x_win);
        $("#reset").click();
        return true;
      }, 100);

    }
    else
    {
      return false;
    }
  }  

  //To prevent input non numeric
  $(".number").bind("keypress", function(e) {

    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8)
    { return true;}
      else 
    {return false;}
  });

  //Function to generate board game base on input parameter
  $("#btnGo").click(function () 
  {    
    scale = $("#inputScale").val();
    if (scale >= 3)
    {
      $("#game tr").remove()      
      var rowGame = "";
      var i = 1;      
      var blockId = 1;      

      while (i <= scale) 
      {
        rowGame += '<tr id="BlockRow">';
        var j = 1;
        while (j <= scale)
        {
          rowGame += '<td class=colTD'+ j +'><li id="' + blockId +'" class="btn btnBlock span1" style="margin: 0;margin-right: 10px;margin-bottom: 10px;">+</li></td>';
          j++;
          blockId ++;
        }

        rowGame += "</tr>";
        i++;
      }
      $("#game").append(rowGame);
      $("#lblPlayer").text('Player O turn').css('color','red');
    }
    else
    {
      alert("the value of Scale cannot smaller than 3")
    }
  });

  //confirmation box for changing scale
  $("#inputScale").bind("keyup", function(e) 
  {
    if (e.keyCode == 8 && $("#game tr").length > 0)
      {
        var answer = confirm('Are you sure you want to change the Scale?');
        if (answer)
        {
          $("#game tr").remove();
          $("#lblPlayer").text('');
        }
        else
        {
          $("#inputScale").val(scale);
        }
      }
  });
  $("#btnGo").click();
});
