import React from "react";
import { Engine, Render, World, Bodies } from "matter-js";
import styled from "styled-components";

const selectPatty = burger => {
  const beef = () =>
    Bodies.rectangle(150, 40, 220, 30, {
      render: {
        sprite: {
          texture: "/static/images/beef.png"
        }
      }
    });
  const chicken = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/chicken.png"
      }
    }
  });
  const mushroom = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/mushrooms.png"
      }
    }
  });
  const sauteedVegetables = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/sauteed-vegetables.png"
      }
    }
  });
  const beefCheese = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/beef-cheese.png"
      }
    }
  });
  const chickenCheese = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/chicken-cheese.png"
      }
    }
  });
  const mushroomCheese = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/mushrooms-cheese.png"
      }
    }
  });
  const sauteedVegetablesCheese = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/sauteed-vegetables-cheese.png"
      }
    }
  });
  const beefCheddar = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/beef-cheddar.png"
      }
    }
  });
  const chickenCheddar = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/chicken-cheddar.png"
      }
    }
  });
  const mushroomCheddar = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/mushrooms-cheddar.png"
      }
    }
  });
  const sauteedVegetablesCheddar = Bodies.rectangle(150, 40, 220, 30, {
    render: {
      sprite: {
        texture: "/static/images/sauteed-vegetables-cheddar.png"
      }
    }
  });
  const patties = {
    meat: beef(),
    chicken,
    mushroom,
    sauteedVegetables
  };
  const cheesePatties = {
    meat: beefCheese,
    chicken: chickenCheese,
    mushroom: mushroomCheese,
    sauteedVegetables: sauteedVegetablesCheese
  };
  const cheddarPatties = {
    meat: beefCheddar,
    chicken: chickenCheddar,
    mushroom: mushroomCheddar,
    sauteedVegetables: sauteedVegetablesCheddar
  };
  if (burger.topping) {
    if (burger.topping.cheese === "simple") {
      if (burger.patty === "doubleMeat") {
        return [beef(), cheesePatties["meat"]];
      }
      if (burger.patty === "tripleMeat") {
        return [beef(), beef(), cheesePatties["meat"]];
      }
      return [cheesePatties[burger.patty]];
    }
    if (burger.topping.cheese === "cheddar") {
      if (burger.patty === "doubleMeat") {
        return [beef(), cheddarPatties["meat"]];
      }
      if (burger.patty === "tripleMeat") {
        return [beef(), beef(), cheddarPatties["meat"]];
      }
      return [cheddarPatties[burger.patty]];
    }
  }
  if (burger.patty === "doubleMeat") {
    return [beef(), beef()];
  }
  if (burger.patty === "tripleMeat") {
    return [beef(), beef(), beef()];
  }
  return [patties[burger.patty]];
};

const selectTopBun = burger => {
  const topBun = Bodies.rectangle(150, -100, 200, 60, {
    render: {
      sprite: {
        texture: "/static/images/top-bun.png"
      }
    }
  });
  const topBunSesame = Bodies.rectangle(150, -100, 200, 60, {
    render: {
      sprite: {
        texture: "/static/images/top-bun-sesame.png"
      }
    }
  });
  const buns = {
    simple: topBun,
    sesame: topBunSesame
  };
  return buns[burger.bun];
};

const selectToppings = burger => {
  const tomato = Bodies.rectangle(150, -90, 180, 15, {
    render: {
      sprite: {
        texture: "/static/images/tomato.png"
      }
    }
  });
  const lettuce = Bodies.rectangle(150, -90, 180, 15, {
    render: {
      sprite: {
        texture: "/static/images/lettuce.png"
      }
    }
  });
  const bacon = Bodies.rectangle(150, -90, 180, 15, {
    render: {
      sprite: {
        texture: "/static/images/bacon.png"
      }
    }
  });
  const egg = Bodies.rectangle(150, -90, 180, 15, {
    render: {
      sprite: {
        texture: "/static/images/egg.png"
      }
    }
  });

  const toppings = {
    tomato,
    lettuce,
    bacon,
    egg
  };
  return Object.keys(burger.topping)
    .filter(topping => topping !== "cheese")
    .map(topping => {
      return toppings[topping];
    });
};

const Wrapper = styled.div`
  display: flex;
`;

class Burger extends React.Component {
  componentDidMount() {
    this.matterEngine = Engine.create();

    this.matterRender = Render.create({
      canvas: this.element,
      engine: this.matterEngine,
      options: {
        wireframes: false,
        width: 300,
        height: 300,
        background: "transparent"
      }
    });

    this.showBurger();
  }
  componentDidUpdate() {
    this.showBurger();
  }
  showBurger = () => {
    const bottomBun = Bodies.rectangle(150, 50, 200, 25, {
      render: {
        sprite: {
          texture: "/static/images/bottom-bun.png"
        }
      }
    });
    const ground = Bodies.rectangle(150, 300, 810, 60, {
      isStatic: true,
      render: {
        fillStyle: "#f6f7f8"
      }
    });
    let bodies = [ground];

    if (this.props.burger) {
      if (this.props.burger.topping) {
        bodies = bodies.concat(selectToppings(this.props.burger));
      }
      if (this.props.burger.patty) {
        if (!this.props.burger.bun) {
          bodies = bodies.concat([...selectPatty(this.props.burger)]);
        } else {
          bodies = bodies.concat([
            selectTopBun(this.props.burger),
            ...selectPatty(this.props.burger),
            bottomBun
          ]);
        }
      } else {
        if (this.props.burger.bun) {
          bodies = bodies.concat([selectTopBun(this.props.burger), bottomBun]);
        }
      }
    }

    Render.stop(this.matterRender);
    World.clear(this.matterEngine.world);
    Engine.clear(this.matterEngine);

    World.add(this.matterEngine.world, bodies);

    Engine.run(this.matterEngine);

    Render.run(this.matterRender);
  };
  render() {
    return (
      <Wrapper>
        <canvas
          ref={element => {
            this.element = element;
          }}
        />
      </Wrapper>
    );
  }
}

export default Burger;
