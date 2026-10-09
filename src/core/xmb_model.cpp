#include "xmb_model.hpp"
#include <stdexcept>
#include <utility>

namespace ps3x360 {
XmbModel::XmbModel(std::vector<Category> categories) : categories_(std::move(categories)) {
  if (categories_.empty()) throw std::invalid_argument("XMB requires at least one category");
  for (const auto& category : categories_)
    if (category.items.empty()) throw std::invalid_argument("Every XMB category requires at least one item");
}
const std::vector<Category>& XmbModel::categories() const noexcept { return categories_; }
std::size_t XmbModel::selected_category() const noexcept { return selected_category_; }
std::size_t XmbModel::selected_item() const noexcept { return selected_item_; }
const Category& XmbModel::current_category() const { return categories_.at(selected_category_); }
const MenuItem& XmbModel::current_item() const { return current_category().items.at(selected_item_); }

std::size_t XmbModel::wrap_index(std::size_t current, int delta, std::size_t count) noexcept {
  if (count == 0) return 0;
  const auto n = static_cast<long long>(count);
  auto value = (static_cast<long long>(current) + delta) % n;
  if (value < 0) value += n;
  return static_cast<std::size_t>(value);
}
bool XmbModel::move_category(int delta) noexcept {
  if (delta == 0) return false;
  const auto next = wrap_index(selected_category_, delta, categories_.size());
  if (next == selected_category_) return false;
  selected_category_ = next; selected_item_ = 0; return true;
}
bool XmbModel::move_item(int delta) noexcept {
  if (delta == 0) return false;
  const auto next = wrap_index(selected_item_, delta, current_category().items.size());
  if (next == selected_item_) return false;
  selected_item_ = next; return true;
}
bool XmbModel::select_category(std::size_t index) noexcept {
  if (index >= categories_.size() || index == selected_category_) return false;
  selected_category_ = index; selected_item_ = 0; return true;
}
bool XmbModel::select_item(std::size_t index) noexcept {
  if (index >= current_category().items.size() || index == selected_item_) return false;
  selected_item_ = index; return true;
}
std::vector<Category> make_default_categories() {
  return {
    {"users","Usuários",{{"profile","Perfil"},{"settings","Configurações do usuário"}}},
    {"settings","Configurações",{{"system","Configurações do sistema"},{"display","Configurações de vídeo"},{"audio","Configurações de áudio"},{"network","Configurações de rede"}}},
    {"photo","Foto",{{"viewer","Visualizador de imagens"}}},
    {"music","Música",{{"player","Reprodutor de música"}}},
    {"video","Vídeo",{{"player","Reprodutor de vídeo"}}},
    {"games","Jogos",{{"library","Biblioteca de jogos"},{"homebrew","Homebrew"},{"refresh","Atualizar biblioteca"}}},
    {"network","Rede",{{"status","Estado da conexão"}}}
  };
}
} // namespace ps3x360
