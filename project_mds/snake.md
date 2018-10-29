## Title
Snake!


## Description
  ### Problem / brief
  Can I build a the classic game snake in the browser?
  The game should feature a scoreboard and options speed, map size and walls options

  ### Solution
  The key to this was all about array manipulation; adding, removing, updating and comapring!
  The game state has a series of options that the user can update at the beginning of the game. Taking the values from different UI elements to set variables that are used to control the rate the speed the game updates, the number of tiles in the grid and whether to add walls. With these values the a game template is generated and rendered.

  Local storage is used to store players scores including the settings they player on. 

  Creating a game loop to check if the snake:
    - collected food
    - has hit a wall
    - hit itself
    - reached the edge of the map )in no walls mode)
    - Is the user trying to move back onto itself

  And perform various actions based on thesestates

  ### Evolution
  There si still a bug where a food item wil try to render in a spot the snake already occupies; it will not appear and cannot be collected meaning the game cannot progress.

  Improve the scroeboard to split scores by settings.
  
  ### Learn
  Great refresher on Array methods, local storgae and managing recursion to control the game state


## About
  ### Client
  Me

  ### Tech
  JavaScript
  ### Date published


## Previews
  ### Preview - public
## Files
  ### Repo - public


## Type
  ### Code challenge
  TRUE
  ### News DNA
  ### Personal
  TRUE
  ### Experiment