#include "xmb_model.hpp"
#include <iostream>
#include <string>

namespace {
void render(const ps3x360::XmbModel& model) {
  const auto& categories = model.categories();
  std::cout << "\n========== PS3X360 | XMB host preview ==========\n";
  for (std::size_t i = 0; i < categories.size(); ++i) {
    std::cout << (i == model.selected_category() ? " [ " : "   ")
              << categories[i].label
              << (i == model.selected_category() ? " ] " : "   ");
  }
  std::cout << "\n\n";
  const auto& items = model.current_category().items;
  for (std::size_t i = 0; i < items.size(); ++i) {
    std::cout << (i == model.selected_item() ? " > " : "   ")
              << items[i].label << '\n';
  }
  std::cout << "\n[A] esquerda  [D] direita  [W] cima  [S] baixo\n"
               "[E] confirmar  [Q] sair\n> ";
}
}

int main() {
  ps3x360::XmbModel model(ps3x360::make_default_categories());
  std::string command;
  while (true) {
    render(model);
    if (!std::getline(std::cin, command)) break;
    if (command.empty()) continue;
    switch (command[0]) {
      case 'a': case 'A': model.move_category(-1); break;
      case 'd': case 'D': model.move_category(1); break;
      case 'w': case 'W': model.move_item(-1); break;
      case 's': case 'S': model.move_item(1); break;
      case 'e': case 'E':
        std::cout << "Selecionado: " << model.current_category().id
                  << "/" << model.current_item().id << '\n';
        std::cout << "Esta prévia de PC não executa ações do Xbox 360. Pressione Enter...";
        std::getline(std::cin, command);
        break;
      case 'q': case 'Q': return 0;
      default: std::cout << "Comando desconhecido. Use A/D/W/S/E/Q.\n"; break;
    }
  }
  return 0;
}
